const { ethers } = require("hardhat");

const main = async () => {
    const DepositInfo = await ethers.getContractFactory("DepositInfo");
   await DepositInfo.waitForDeployment();

    const depositAddress =  await DepositInfo.getAddress();
    console.log('NFT_DEPLOYED_TO:', await DepositInfo.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});