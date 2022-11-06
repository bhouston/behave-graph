import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import '@nomicfoundation/hardhat-chai-matchers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import '@nomiclabs/hardhat-ethers';
import { BehaviorGraph__factory } from '../typechain-types';
import { ethers } from 'hardhat';
import { BigNumber, Signer } from 'ethers';
import { BehaviorGraph, NodeStruct, TokenGateRuleStruct } from '../typechain-types/contracts/BehaviorGraph';
import { Token } from '../typechain-types/contracts/Token';
import { token } from '../typechain-types/@openzeppelin/contracts';

describe('BehaviorGraph', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, anotherAccount] = await ethers.getSigners();

    const BehaviorGraph = (await ethers.getContractFactory('BehaviorGraph')) as BehaviorGraph__factory;
    const behaviorGraph = await BehaviorGraph.deploy();

    return { behaviorGraph, owner, otherAccount, anotherAccount };
  }

  describe('safeMint', () => {
    it('raises an erroor if the caller is not the owner', async () => {
      const { behaviorGraph, otherAccount } = await loadFixture(deployFixture);

      const ipfsHash = 'asdfasdfasfda';

      const nodesToCreate: NodeStruct[] = [];

      await expect(behaviorGraph.connect(otherAccount).safeMint(ipfsHash, nodesToCreate)).to.be.rejected;
    });
    it('creates a token with the list of node onto the list of nodes', async () => {
      const { behaviorGraph, otherAccount } = await loadFixture(deployFixture);

      const ipfsHash = 'asdfasdfasfda';

      const nodesToCreate: NodeStruct[] = [
        {
          nodeType: 0,
          id: '0',
          tokenGateRule: {
            active: false,
            tokenContract: otherAccount.address,
          },
        },
        {
          nodeType: 1,
          id: '5',
          tokenGateRule: {
            active: true,
            tokenContract: behaviorGraph.address,
          },
        },
      ];

      const tx = await behaviorGraph.safeMint(ipfsHash, nodesToCreate);

      await tx.wait();

      const tokenId = 0;

      const node = await behaviorGraph.getNode(tokenId, '5');

      expect(node.nodeType).to.eql(nodesToCreate[1].nodeType);
    });
  });

  describe('executeAction', () => {
    let nodesToCreate: NodeStruct[] = [];

    let contract: BehaviorGraph;
    let otherTokenContract: Token;
    let otherAccount: Signer;

    beforeEach(async () => {
      const { behaviorGraph, otherAccount: _otherAccount } = await deployFixture();
      const TokenContract = await ethers.getContractFactory('Token');

      const tokenContract = (await TokenContract.deploy()) as Token;

      contract = behaviorGraph;
      otherTokenContract = tokenContract;
      otherAccount = _otherAccount;
    });

    describe('when the action is not token gated', () => {
      it('can successfully execute that action and emits an event with the count', async () => {
        const actionId = '5';
        const nodesToCreate = [
          {
            nodeType: 0,
            id: actionId,
            tokenGateRule: {
              active: false,
              tokenContract: contract.address,
            },
          },
        ];

        const ipfsHash = 'asdfasfda';
        const tx = await contract.safeMint(ipfsHash, nodesToCreate);
        await tx.wait();

        const tokenId = 0;

        const executerAddress = otherAccount;

        const actionCount = 1;

        await expect(contract.connect(executerAddress).executeAction(tokenId, actionId))
          .to.emit(contract, 'ActionExecuted')
          .withArgs(await executerAddress.getAddress(), tokenId, actionId, actionCount);

        await expect(contract.connect(executerAddress).executeAction(tokenId, actionId))
          .to.emit(contract, 'ActionExecuted')
          .withArgs(await executerAddress.getAddress(), tokenId, actionId, actionCount + 1);
      });
    });

    describe('when the action is token gated', () => {
      beforeEach(async () => {
        const nodesToCreate = [
          {
            nodeType: 0,
            id: '10',
            tokenGateRule: {
              active: false,
              tokenContract: contract.address,
            },
          },
          {
            nodeType: 0,
            id: '1',
            // this rule requires you to have a token from another contract
            tokenGateRule: {
              active: true,
              tokenContract: otherTokenContract.address,
            },
          },
        ];

        // mint 2 tokens
        await contract.safeMint('0asdfasfd', []);
        const tx = await contract.safeMint('asdfasdfasfd', nodesToCreate);

        await tx.wait();
      });
      describe('when the user does not have a token of that acollection', () => {
        it('cannot successfully execute that action', async () => {
          // user does not have a token of that other account, so this fails.
          const tokenId = 1;
          const actionId = '1';
          await expect(contract.connect(otherAccount).executeAction(tokenId, actionId)).to.be.reverted;
        });
      });

      describe('when the user has a token of that collection', () => {
        it('can successfully execute that action and emits the result', async () => {
          const executerAccount = otherAccount;
          const executerAccountAddress = await executerAccount.getAddress();

          const tokenId = 1;
          const actionId = '1';
          const actionCount = 1;

          // mint a token on the other contract the balance should be good now
          const tx = await otherTokenContract.connect(executerAccount).safeMint('asdfasdfafs');
          await tx.wait();

          // verify that we have a token in the other contract
          const balance = await otherTokenContract.balanceOf(executerAccountAddress);
          expect(balance).to.eql(BigNumber.from(1));

          // successfully call eecute the other action
          await expect(contract.connect(otherAccount).executeAction(tokenId, actionId))
            .to.emit(contract, 'ActionExecuted')
            .withArgs(await executerAccountAddress, tokenId, actionId, actionCount); // We accept any value as `when` arg
        });
      });
    });
  });
});
