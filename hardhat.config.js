require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

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
      url: "https://ngeth.n3g0.nahmii.net",
      accounts: ["852faf46019bdaaa1cebe9e651baa1c17304926900e7952ef586d247cf9910e1"]
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/iWVVGEdMfq5za6NeV_U0W86woka0EQow",
      accounts: ["852faf46019bdaaa1cebe9e651baa1c17304926900e7952ef586d247cf9910e1"]
    }
  },
  etherscan: {
    apiKey: "M5K1IXBCD394915V37W5IT27HGU8WNTZE9"
  },
};