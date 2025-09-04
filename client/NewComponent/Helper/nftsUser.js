import React from "react";
import axios from "axios";

 const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}
export const NftsUser = async (user) => {
    try{
        console.log('NEW_NFTS_USER:',user)
        const res = await axios.post(`${url}/api/auth/nfts`, user, Headers);
        console.log('NFT USER CREATION SUCCESS',res.data?.data);
        dispatch(removeError()); 
    } catch (err) {
        console.log(err)
    }
}