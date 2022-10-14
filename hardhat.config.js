require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });


const ALCHEMY_GOERLI_API_KEY_URL = process.env.ALCHEMY_GOERLI_API_KEY_URL;

const API_TOKEN = process.env.API_TOKEN;

const NAHMII_URL = process.env.NAHMII_URL;

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
const ACCOUNTTWO_PRIVATE_KEY = process.env.ACCOUNTTWO_PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.7.5",
        settings: {},
      },
    ],
  },
  networks: {
    nahmii: {
      url: NAHMII_URL,
      accounts: [ACCOUNT_PRIVATE_KEY]
    },
    goerli: {
      url: ALCHEMY_GOERLI_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY, ACCOUNTTWO_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: API_TOKEN
  }
};