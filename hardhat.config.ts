import dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-dependency-compiler';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();

const privateKey = process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000000';
const infuraKey = process.env.INFURA_API_KEY || '';
const etherscanApi = process.env.ETHERSCAN_API_KEY || '';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: './typechain-types',
    target: 'ethers-v5',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    arbitrumRinkeby: {
      url: `https://arbitrum-rinkeby.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    bnb: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [privateKey]
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    optimismKovan: {
      url: `https://optimism-kovan.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
  },
  etherscan: {
    apiKey: etherscanApi
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './tests',
  },
  dependencyCompiler: {
    paths: [
    ],
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
    gasPrice: 10,
    token: 'ETH',
  },
  mocha: {
    timeout: 60000,
  }
};

export default config;
