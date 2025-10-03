require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    myLocal: {
      url: "http://127.0.0.1:8545",
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.NETWORK_PRIVATE_KEY],
      chainId: 31337,
      timeout: 40000
    }
  },
  etherscan: 
  {
    apiKey: {
      
    }
  }
};
