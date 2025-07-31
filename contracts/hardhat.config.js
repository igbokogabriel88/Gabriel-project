require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.28",
};
