const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

const updateEnvFile = (variables) => {
  console.log('Node addresses:', variables.MARKET_ADDRESS,  variables.NFT_ADDRESS, variables.EXHIBITION_ADDRESS);
  const backendEnv = path.join(__dirname, "..","..", "nodeJs", ".env");
  try{
      let envContent = '';
      if (fs.existsSync(backendEnv)) {
        envContent = fs.readFileSync(backendEnv, 'utf8')
      }
      let lines = envContent.split('\n');
      let updatedLines = [];
      let keysToUpdate = Object.keys(variables);
      const updatedKeys = new Set();
      for (let line of lines) {
        if (line.trim() === '' || line.startsWith('#')) {
          updatedLines.push(line);
          continue;
        }
        const [key] = line.split('=');
        if (key && keysToUpdate.includes(key)) {
          updatedLines.push(`${key}=${variables[key]} `);
          updatedKeys.add(key);
        } else {
          updatedLines.push(line);
        }
      }
      for (let key of keysToUpdate) {
        if (!updatedKeys.has(key)) {
          updatedLines.push(`${key}=${variables[key]}`);
      }
    }
      fs.writeFileSync(backendEnv, updatedLines.join('\n'))
      console.log('NodeJs Address added');
    
  } catch (err) {
      console.error('Failed to write address to env file')
  }
}
const main = async  () => {
    
    if (!ethers) {
      throw new Error("ethers or ethers not found");
    }
    const [deployer] = await ethers.getSigners();
    console.log('DEPLOYING_CONTRACT_WITH_ACCOUNT:', deployer.address);
    const mintFee = ethers.parseEther("0.1");
    const adminAddress = deployer.address;
    const treasury = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    
    console.log('GETING NFT CONTRACT FACTORY...');
    const NFT = await ethers.getContractFactory("MyNFT");
    console.log('GOT NFT CONTRACT FACTORY:', NFT);

    console.log('DEPLOYING NFT...');
    const nft = await NFT.deploy(mintFee, adminAddress);

    await nft.waitForDeployment();
    const nftAddress =  await nft.getAddress();
    console.log('NFT_DEPLOYED_TO:', await nft.getAddress());
    console.log('MINT_FEE:', mintFee);

    const Exhibition = await ethers.getContractFactory("ExhibitionManager");
    console.log('GOT EXHIBITION CONTRACT FACTORY:', Exhibition);

    console.log('DEPLOYING Exhibition...');
    const exhibition = await Exhibition.deploy();

    await exhibition.waitForDeployment();
    const exhibitionAddress =  await exhibition.getAddress();
    console.log('EXHIBITION_DEPLOYED_TO:', await exhibition.getAddress());

    const Marketplace = await ethers.getContractFactory("NFTMarketplace");
        
        const marketplace = await Marketplace.deploy(exhibitionAddress, treasury);
      
        await marketplace.waitForDeployment();
         const marketplaceAddress =  await marketplace.getAddress();
        console.log("MARKETPLACE_DEPLOYED_TO:", await marketplace.getAddress());
    
                    
             console.log('NFT_ADDRESS:', nftAddress);
             
             console.log('MARKET_ADDRESS:', marketplaceAddress);
             console.log('EXHIBITION_ADDRESS:', exhibitionAddress);
          updateEnvFile({  
                NFT_ADDRESS: nftAddress,
                MARKET_ADDRESS: marketplaceAddress,
                EXHIBITION_ADDRESS: exhibitionAddress
              });

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
           fs.writeFileSync(
            path.join(contractsDir, "Exhibition.json"),
            JSON.stringify({abi: (await artifacts.readArtifact("ExhibitionManager")).abi}, null, 2)
           );

        const frontendEnv = path.join(__dirname, "..","..", "client", ".env")
        const envContent = `
        VITE_NFT_CONTRACT_ADDRESS = ${nftAddress}
        VITE_MARKETPLACE_ADDRESS = ${marketplaceAddress}
        VITE_EXHIBITION_ADDRESS = ${exhibitionAddress}
        `.trim();

        fs.writeFileSync(frontendEnv, envContent); 
        console.log('FRONTEND ENV FILE UPDATED')   
       }
       
   main().catch((error) =>{
            console.error('ERROR:',error);
            process.exitCode = 1;
        } )
