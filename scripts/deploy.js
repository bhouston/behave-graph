"use strict";
// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require("@nomiclabs/hardhat-ethers");
const hardhat_1 = require("hardhat");
const fs_1 = require("fs");
const util_1 = require("util");
const writeFileAsync = (0, util_1.promisify)(fs_1.writeFile);
const readFileAsync = (0, util_1.promisify)(fs_1.readFile);
const mkdirAsync = (0, util_1.promisify)(fs_1.mkdir);
async function main() {
    // This is just a convenience check
    if (hardhat_1.network.name === 'hardhat') {
        console.warn('You are trying to deploy a contract to the Hardhat Network, which' +
            'gets automatically created and destroyed every time. Use the Hardhat' +
            " option '--network localhost'");
    }
    // ethers is available in the global scope
    const [deployer] = await hardhat_1.ethers.getSigners();
    const address = await deployer.getAddress();
    console.log('Deploying the contracts with the account:', address);
    console.log('Account balance:', (await deployer.getBalance()).toString());
    const contractFactory = await hardhat_1.ethers.getContractFactory('BehaviorGraph');
    const deployedContract = await contractFactory.deploy();
    await deployedContract.deployed();
    console.log('Contract address:', deployedContract.address);
    // We also save the contract's artifacts and address in the frontend directory
    await saveFrontendFiles(deployedContract);
}
const contractsDir = path_1.default.join(__dirname, '..', 'editor', 'src', 'contracts');
async function writeAbi() {
    const ContractArtifact = await hardhat_1.artifacts.readArtifact('BehaviorGraph');
    const abiTs = `export const abi = ${JSON.stringify(ContractArtifact.abi, null, 2)} as const`;
    await writeFileAsync(path_1.default.join(contractsDir, 'abi.ts'), abiTs);
}
const contractAddressesFile = path_1.default.join(contractsDir, 'addresses.json');
async function writeContractAddress(contract) {
    let currentAddresses;
    if (!(0, fs_1.existsSync)(contractAddressesFile)) {
        currentAddresses = {};
    }
    else {
        currentAddresses = JSON.parse(await readFileAsync(contractAddressesFile, {
            encoding: 'utf-8',
        }));
    }
    const updatedAddresses = {
        ...currentAddresses,
        [hardhat_1.network.name]: contract.address,
    };
    await writeFileAsync(contractAddressesFile, JSON.stringify(updatedAddresses, undefined, 2));
}
async function saveFrontendFiles(contract) {
    if (!(0, fs_1.existsSync)(contractsDir)) {
        await mkdirAsync(contractsDir);
    }
    await writeContractAddress(contract);
    await writeAbi();
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
