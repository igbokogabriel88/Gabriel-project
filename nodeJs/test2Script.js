require('dotenv').config()
const pinataSDK = require('@pinata/sdk');
const  fs = require('fs');
const path = require('path');
const https = require('https');

const testNFTStorage  = async () => {
    const pinata = new pinataSDK(
        process.env.PINATA_API_KEY,
        process.env.PINATA_SECRET_KEY
    );
    try{
       console.log('Testing Pinata connection...');
       filePath = path.join(__dirname,'Multer', 'wrapper', '1756834129635-avatar.jpg');
       console.log('FILEPATH:', filePath);

       console.log('Path exists:', fs.existsSync(filePath));
       console.log('Is file:', fs.statSync(filePath).isFile());
       console.log('File Size:', fs.statSync(filePath).size, 'bytes')

//    const testFilePath = './test-file.txt';
    fs.writeFileSync(filePath, 'This is a test file for Pinata upload');
    const fileStream = fs.createReadStream(filePath);
    const result = await pinata.pinFileToIPFS(fileStream, {
       pinataMetadata: {
        name: 'test-file.txt'
       }
           });
           console.log('File ipload successfully');
           console.log('IPFS Hash:', result.IpfsHash);
           console.log('IPFS URL:', `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
           fs.unlinkSync(filePath);
           return result.IpfsHash
   
    } catch (error) {
        console.log('Upload failed:', error.response?.data || error.message);
        throw error;
    }
    
 }
   testNFTStorage()



   