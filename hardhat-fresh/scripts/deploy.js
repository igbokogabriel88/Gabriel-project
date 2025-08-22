
import { ethers, artifacts } from "hardhat";
import fs  from "fs";
import path from ("path");

const main = async  () => {
    
    if (!ethers || !ethers.utils) {
      throw new Error("ethers or ethers.utils not found");
    }
    const [deployer] = await ethers.getSigners();
    console.log('DEPLOYING_CONTRACT_WITH_ACCOUNT:', deployer.address);
    const mintFee = ethers.parseEther("0.02");
    const adminAddress = deployer.address;
    
    console.log('GETING NFT CONTRACT FACTORY...');
    const NFT = await ethers.getContractFactory("MyNFT");
    console.log('GOT NFT CONTRACT FACTORY:', NFT);

    console.log('DEPLOYING NFT...');
    const nft = await NFT.deploy(mintFee, adminAddress);
    console.log('Transaction sent:', nft.deployTransaction.hash);

    console.log('Waiting for nft to be mined...');
    await nft.waitForDeployment();
    console.log('NFT_DEPLOYED_TO:', nft.target);
    console.log('MINT_FEE:', mintFee);

    console.log('GETING MARKETPLACE CONTRACT FACTORY...');
    const Marketplace = await ethers.getContractFactory("NFTMarketplace");
      console.log('GOT NFT CONTRACT FACTORY...');

        
        const marketplace = await Marketplace.deploy();
        console.log('Transaction sent:', nft.deployTransaction.hash);
         
        console.log('Waiting for marketplace to be mined...');
        await marketplace.waitForDeployment();
        console.log("MARKETPLACE_DEPLOYED_TO:", marketplace.target);
        
        const contractsDir = path.join(__dirname, "..", "client", "src", "contracts");
          if (!fs.existsSync(contractsDir)) {
            fs.mkdirSync(contractsDir, { recursive: true});
          }

          fs.writeFileSync(
            path.join(contractsDir, "NFT.json"),
            JSON.stringify({abi: (await artifacts.readArtifact("NFT")).abi}, null, 2)
          );
           fs.writeFileSync(
            path.join(contractsDir, "NFTMarketplace.json"),
            JSON.stringify({abi: (await artifacts.readArtifact("NFTMarketplace")).abi}, null, 2)
           );

        const frontendEnv = path.join(__dirname, "..", "client", ".env")
        const envContent = `
        VITE_NFT_CONTRACT_ADDRESS = ${nft.address}
        VITE_MARKETPLACE_ADDRESS = ${marketplace.address}
        `;

        fs.writeFileSync(frontendEnv, envContent); 
        console.log('FRONTEND ENV FILE UPDATED')   
       }

   main().catch((error) =>{
            console.error('ERROR:',error);
            process.exitCode = 1;
        } )
