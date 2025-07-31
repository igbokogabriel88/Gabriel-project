require('dotenv').config();
const { ethers} = require('ethers');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.js');
const nft_abi = require('./NFT_ABI.json');
const marketplace_abi = require('./MARKETPLACE_ABI.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const provider = new ethers.providers.WebSocketProvider(`wss://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_KEY}`)

const nftContract = new ethers.Contract(process.env.nft_address, nft_abi, provider);
const marketplaceContract = new ethers.Contract(process.env.nft_address, marketplace_abi_abi, provider);

nftContract.on('MInted', async (to, tokenId, url) => {
   await db.collection(nfts).doc(String(tokenId)).set({
    tokenId: tokenId.toString(),
    url,
    owner: to,
    listed: false,
    timestamp: Date.now()
   });
   });

   marketplaceContract.on('ItemListed', async (nftAddress, tokenId, seller, price) => {
      await db.collection('nfts').doc(String(tokenId)).update({
        listed: true,
        price: ethers.utils.formatEther(price),
        seller
      });
});

   marketplaceContract.on('ItemSold', async (nftAddress, tokenId, buyer, price) => {
    await db.collection('nfts').doc(String(tokenId)).update({
      listed: false,
      price: ethers.utils.formatEther(price),
      onwer: buyer
    });
});

