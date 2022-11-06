"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: __dirname + '/.env' });
const { ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY, MUMBAI_PRIVATE_KEY, SKALE_PRIVATE_KEY } = process.env;
let networks = {};
if (SKALE_PRIVATE_KEY) {
    networks = {
        ...networks,
        skale: {
            url: 'https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos',
            accounts: [SKALE_PRIVATE_KEY],
        },
    };
}
if (ALCHEMY_API_KEY) {
    if (GOERLI_PRIVATE_KEY) {
        networks = {
            ...networks,
            goerli: {
                url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
                accounts: [GOERLI_PRIVATE_KEY],
            },
        };
    }
    if (MUMBAI_PRIVATE_KEY) {
        networks = {
            ...networks,
            mumbai: {
                url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
                accounts: [MUMBAI_PRIVATE_KEY],
                chainId: 80001,
            },
        };
    }
}
const result = {
    solidity: '0.8.9',
    networks,
};
module.exports = result;
