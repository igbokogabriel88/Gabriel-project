// solidity mintNFT(address recipient, string memery tokenURL) public returns 

import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers'
import {db} from './firebase';
import {collection, addDoc} from 'firebase/firestore';

const NFT_CONTRACT_ADDRESS = '';
const NFT_CONTRACT_ABI = [ 
'function mintNFT(address recipient, string memery tokenURL) public returns(unit256)'
];
 const MarketplaceMInt = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [walletAdrress, setWalletAddress] = useState(null);
    const [contract, setContract] = useState(null);
    const [minting, setMinting] = useState(false);
    const connectWallet = async ()=> {
        if (!window.ethereum){
            alert('Insatll Metamask');
            return;
        }
    const accounts = await window.ethereum.request({method: 'eth_requestAccount'});
    setWalletAddress(account[0]);
    const provider = new ethers.providers.WEb3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
    setContract(nftContract);    
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleMintNFT = async () => {
        if (!file || !title || !walletAdrress) {
            alert('Please complete all fields');
            return ;
        }
        setMinting(true);
        try{
            const fileUrl = 'imported url from storage';
            metadata = {title, image: fileUrl};
            const docRef = await addDoc(collection(db, 'nftMetadata'), metadata);
            const tokenURL = '';
            const tx = await contract.mintNFT(walletAdrress, tokenURL);
            await tx.wait();
            alert('NFT Minted successfully!');
        } catch (error) {
            console.error('Error minting NFT:', error);
            alert('Minting failed');
        } finally {
            setMinting(false);
        }
        return (
            
        )
    }
 }