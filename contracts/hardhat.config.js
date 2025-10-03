require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports =  {
  networks: {
    localhost: {
      url: `https://127.0.0.1:8545`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 31337
    }
  },
  solidity: "0.8.28",
}
