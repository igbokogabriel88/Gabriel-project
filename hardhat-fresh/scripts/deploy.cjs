const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

const main = async  () => {
    
    if (!ethers) {
      throw new Error("ethers or ethers not found");
    }
    const [deployer] = await ethers.getSigners();
    console.log('DEPLOYING_CONTRACT_WITH_ACCOUNT:', deployer.address);
    const mintFee = ethers.parseEther("0.02");
    const adminAddress = deployer.address;
    const treasury = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    
    console.log('GETING NFT CONTRACT FACTORY...');
    const NFT = await ethers.getContractFactory("MyNFT");
    console.log('GOT NFT CONTRACT FACTORY:', NFT);

    console.log('DEPLOYING NFT...');
    const nft = await NFT.deploy(mintFee, adminAddress, treasury);

    console.log('Waiting for nft to be mined...');
    await nft.waitForDeployment();
    const nftAddress =  await nft.getAddress();
    console.log('NFT_DEPLOYED_TO:', await nft.getAddress());
    console.log('MINT_FEE:', mintFee);

    const Marketplace = await ethers.getContractFactory("NFTMarketplace");
        
        const marketplace = await Marketplace.deploy();
      
        await marketplace.waitForDeployment();
         const marketplaceAddress =  await marketplace.getAddress();
        console.log("MARKETPLACE_DEPLOYED_TO:", await marketplace.getAddress());
        
        const contractsDir = path.join(__dirname, "..","..", "client", "src", "contracts");
          if (!fs.existsSync(contractsDir)) {
            fs.mkdirSync(contractsDir, { recursive: true});
          }

          fs.writeFileSync(
            path.join(contractsDir, "NFT.json"),
            JSON.stringify({abi: (await artifacts.readArtifact("MyNFT")).abi}, null, 2)
          );
           fs.writeFileSync(
            path.join(contractsDir, "Marketplace.json"),
            JSON.stringify({abi: (await artifacts.readArtifact("NFTMarketplace")).abi}, null, 2)
           );

        const frontendEnv = path.join(__dirname, "..","..", "client", ".env")
        const envContent = `
        VITE_NFT_CONTRACT_ADDRESS = ${nftAddress}
        VITE_MARKETPLACE_ADDRESS = ${marketplaceAddress}
        `.trim();

        fs.writeFileSync(frontendEnv, envContent); 
        console.log('FRONTEND ENV FILE UPDATED')   
       }

   main().catch((error) =>{
            console.error('ERROR:',error);
            process.exitCode = 1;
        } )
