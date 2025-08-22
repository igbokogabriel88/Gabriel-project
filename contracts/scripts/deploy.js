const  ethers = require("hardhat");
const fs = require("fs");

const mmain = async  () => {
    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy();
    await nft.deployed();
    console.log('NFT_DEPLOYED_TO:', nft.address);

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
