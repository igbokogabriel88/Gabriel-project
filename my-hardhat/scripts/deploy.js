const  ethers = require("hardhat");
const fs = require("fs");

const main = async  () => {
    const [deployer] = await ethers.getSigners();
    console.log('DEPLOYING_CONTRACT_WITH_ACCOUNT:', deployer.address);
    const treasury = deployer.address;

    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy(treasury);

    console.log('NFT_DEPLOYED_TO:', nft.address);
    console.log('TREASURY_SET_TO:', treasury);
    await nft.deployed();

    const Marketplace = await ethers.getContractFactory("NFTMarketplace");
        const marketplace = await Marketplace.deploy();
        await marketplace.deployed();
        consoile.log("MARKETPLACE_DEPLOYED_TO:", marketplace.address);

        const envContent = `
        VITE_NFT_CONTRACT_ADDRESS = ${nft.address}
        VITE_MARKETPLACE_ADDRESS = ${marketplace.address}
        `;

        fs.writeFileSync(".env", envContent);    
}

   main().catch((error) =>{
            console.error(error);
            process.exitCode = 1;
        } )
