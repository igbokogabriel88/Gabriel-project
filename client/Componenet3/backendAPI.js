//backend/server.js
const express = require('express');
const {ethers} = require('ethers');
const cors = require('cors');
const { useState, useEffect } = require('react');
require('dotenv').config();

const app = express();
app.use(cors());

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

const contractAddress = '...';
const ABI = '...';
 const nftContract = new ethers.Contract(contractAddress, ABI, provider);
  app.get('/api/nfts/:address', async (req, res) => {
    const userAddress = req.params.address;
    try{
        const balance = await contractAddress.balanceOf(userAddress);
        const tokens = [];
         for (let i = 0; i < balance; i++ ) {
           const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
           const tokenURL = await nftContract.tokenURL(tokenId);
           tokens.push({tokenId: tokenId.toString(), tokenURL})
         }
         res.json({nfts: tokens})

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch NFTS'})
    }
  });
  const PORT = process.env.POST || 5000;
  app.listen(PORT, () => console.log(`Backend API running on port ${PORT}`));

  //frontend

  //import axios, ethers, useState and useEffect

  const NFTGallery = () => {
    const [wallet, setWallet] = useState('');
    const [nfts, setNfts] = useState([]);
     const connectWallet = async () => {
        const [account] = await window.ethereum.request({method: "eth_requestAccounts"});
        setWallet(account);
     };
     useEffect(()=> { connectWallet}, []);

     useEffect(()=> {
        const fetchNFTS = async () => {
            if (!wallet) return;
            try{
             const res = await axios.get('http://5000/api/nfts/${wallet}');
             const metadataList = await Promise.all(
                 res.data.nfts.map(async ({tokenURL}) => {
                     metadata = await fetch(tokenURL).then(res => res.json());
                      return metadata
                  })
             );
             setNfts(metadataList);
            } catch (err){
             console.error('Error loading NFTs:', err)
            };
        } 
       fetchNFTS();
    },[])
  } 