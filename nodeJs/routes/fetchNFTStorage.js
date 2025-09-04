const express = require('express');
const router = express.Router();
const {NFTStorage, File} = require("nft.storage");
const pinataSDK = require('@pinata/sdk');
const path = require('path');
const fs = require('fs');

router.post('/nftStorage', async (req, res)=>{
    
      //  const IPFS_KEY = (process.env.VITE_STORAGE_KEY);p
       const pinata_api_key = process.env.PINATA_API_KEY;
       const pinata_secret_key = process.env.PINATA_SECRET_KEY;
       const pinata_jwt = process.env.PINATA_JWT_KEY
        console.log('PINATA_API_KEY_LENGTH:', (pinata_api_key)?.length);
        console.log('PINATA_SECRET_KEY_LENGTH:', (pinata_secret_key)?.length);
      
      
         const {name, description, category, filename, floorPrice} = req.body;
         console.log('REQ_BODY:', req.body);
         console.log('TYPE_OF_REQ_BODY:', typeof req.body)
         console.log('NFT-PROFILE:', filename); 
        
         if (!filename) {
          return res.status(400).json({error: 'File reference is required'})
         }
              // const client = new NFTStorage({token: IPFS_KEY});
              const pinata = new pinataSDK(
                process.env.PINATA_API_KEY,
                process.env.PINATA_SECRET_KEY
              );

               console.log('NFT_STORAGE_PINATA:', pinata);
               const fileName = filename?.fileName;
               console.log('FILENAME:',fileName)
               console.log('TYPEOF_FILENAME:', typeof fileName);
              // const  filePath = path.join(__dirname,'..','Multer', 'wrapper',fileName);
              const filePath = filename?.pathName
              
              console.log('Starting to read file with callback...:', filePath);
              try{
                 fs.writeFileSync(filePath, 'This simulate an NFT image file');
                // const fileBuffer = await fs.promises.readFile(filePath);
                // console.log('File buffer size:', fileBuffer.length, 'bytes')

                 const imageStream = fs.createReadStream(filePath);
                 console.log('IMAGE_STREAM:', imageStream);
                 imageStream.on('open', () => {
                  console.log('Stream opened successfully');
                 });
                 imageStream.on('ready', () => {
                  console.log('Stream ready');
                 });
 
                 const imageResult = await pinata.pinFileToIPFS(imageStream, {
                  pinataMetadata : {
                    name: `NFT-Image-${Date.now()}-${filename?.originalName}`
                  }
                 });
                 console.log('IMAGE_RESULT:', imageResult)
                 const imageHash = `ipfs://${imageResult.IpfsHash}`;

                 console.log('IMAGE_HASH:', imageHash)

                 const nftMetadata = {
                  title: name, 
                  description,
                  category,
                  image: imageHash,
                  price: floorPrice.toString()
                 };
                  const metadataResult = await pinata.pinJSONToIPFS(nftMetadata, {
                  pinataMetadata: {
                    name: `NFT-Metadata-${Date.now()}-{name}`
                  }
                  });
                  
                  const metadataHash = `ipfs://${metadataResult.IpfsHash}`;
                  const image_Hash = imageResult.IpfsHash;

                  console.log('METADATA_HASH:', metadataHash);
                  
                  await fs.unlink(filePath, (error) => {
                    if (error) {
                      console.log('Error deleting file:', error.message);
                      // return res.status(500).json({error:'Error deleting file'})
                    }
                    console.log('File deleted successfully');
                  
                  });
                  return res.status(200).json({message: 'URI successfully fetched', value: {
                    tokenId: metadataHash, imageHash: image_Hash
                  }});
              } catch (err) {
                     console.error('NFT PROCESSING ERROR:', err);
                      return res.status(500).json({error: err.message});
              }
        
        } )

module.exports = router