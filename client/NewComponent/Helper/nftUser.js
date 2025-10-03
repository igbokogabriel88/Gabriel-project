import React from "react";
import axios from "axios";
import { fetchNftUser } from "../Redux/Action/Action";

 const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}

export const NftUser = async (user, walletAddress, dispatch) => {
    console.log('NEW NFT WALLET ADDRESS:', walletAddress);
    const payload = {
        ...user,
        walletAddress
    }
    try{
        // console.log('NEW_NFTS_USER:',user)
        const res = await axios.post(`${url}/api/auth/nfts`, payload, Headers);
        console.log('NFT USER CREATION SUCCESS',res);
         dispatch(fetchNftUser(res.data?.value)); 
    } catch (err) {
        console.log(err)
    }
}