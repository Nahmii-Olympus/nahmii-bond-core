require("@nomiclabs/hardhat-waffle");
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
    goerli: {
      url: "https://ngeth.n3g0.nahmii.net",
      accounts: ["ee5ed6e1213e1ac05d9af4b2dbe8bc332eb39f2a1cafa09016b3582c17f1e187"]
    }
  }
};
