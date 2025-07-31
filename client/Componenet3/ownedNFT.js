import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers'
import {db} from './firebase';
import {collection, getDoc, query, where} from 'firebase/firestore';

const ProfilePage = () => {
    const [userNFTs, setUserNFTS]= useState([]);

        const fetchUserNFTs = async () => {
        const q = query(collection(db, nfts), where('owner', '==', walletAddress));
        const querySnapshot = await getDoc(q);
        const nfts = [];
        querySnapshot.forEach((doc) => {
            nfts.push(doc.data());
        });
        setUserNFTS(nfts);        
        };
        useEffect(()=> {
            if (walletAddress) fetchUserNFTs();
        },[walletAddress]);
    return(
        
    )
}

