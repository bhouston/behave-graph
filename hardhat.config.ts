import '@nomicfoundation/hardhat-toolbox';
import { config} from 'dotenv';

config({ path: __dirname + '/.env' });

const { ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY, MUMBAI_PRIVATE_KEY } = process.env;

let networks = {};

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

module.exports = {
  solidity: '0.8.9',
  networks,
};
