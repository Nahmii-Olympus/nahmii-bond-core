require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.7.5",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/Kcm7MrA9ErXtWQgdNTpHMtCcLXe3GaA0",
      accounts: ["90bf8309d88845c3fe8c755fabf1aea1505f72ec012bba515fbe4304ee89e2b4", "7b66e3a8001a72072b14d37c62510cceec578b5a515f084bb645f1d20bca4f44", "205735704971f6900ed45015d7753443c136b99433a6dc06607a3934f260762e", "0525a29a9f8069a981c304aa6b740ee7756b131de47d0c398cc2b67bdaead723"]
    }
  }
};
