import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BehaviorGraph } from '../typechain-types';

describe('Lock', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BehaviorGraph = await ethers.getContractFactory('BehaviorGraph');
    const behaviorGraph = await BehaviorGraph.deploy();

    return behaviorGraph;
  }

  describe('Something', () => {
    let behaviorGraph: BehaviorGraph;

    beforeEach(async () => {
      behaviorGraph = await deployContract();
    });
  });
});

//   describe('Withdrawals', function () {
//     describe('Validations', function () {
//       it('Should revert with the right error if called too soon', async function () {
//         const { lock } = await loadFixture(deployContract);

//         await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
//       });

//       it('Should revert with the right error if called from another account', async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(deployContract);

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(deployContract);

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe('Events', function () {
//       it('Should emit an event on withdrawals', async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(deployContract);

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.emit(lock, 'Withdrawal').withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe('Transfers', function () {
//       it('Should transfer the funds to the owner', async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(deployContract);

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances([owner, lock], [lockedAmount, -lockedAmount]);
//       });
//     });
//   });
// });
