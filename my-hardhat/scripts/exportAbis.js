const fs = require('fs');
const path = require('path')

const main = async () => {
    const contracts = ['MyNFT', 'NFTMarketplace'];
    const frontendPath = path.join(__dirname, "..", "client", 'abis');

    if (!fs.existsSync(frontendPath)){
        fs.mkdirSync(frontendPath, {recursive: true});
    }
    contracts.forEach((contractName) =>{
        const artifactPath = path.join(__dirname, `../artifacts/contracts/${contractName}.sol/${contractName}.json`);

        if (!fs.existsSync(artifactPath)) {
            console.error(`Artifact for ${contractName} not found at ${artifactPath}`);
            return;
        }
        const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
        const abi = artifact.abi;

        const abiPath = path.join(frontendPath, `${contractName}ABI.json`);
        fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));
        
        console.log(`ABI for ${contractName} written to ${abiPath}`);

    } )
}

 main().catch((error) => {
    console.error(error);
    process.exit(1)
 });