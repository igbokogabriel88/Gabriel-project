import React from "react";
import axios from "axios";
// import {removeError, setAlert, loginSuccess, loginFail, loadUser,
//   setLoading, clearLoading} from "./Redux/Action/Action";
//   import { set_Error, set_Field_Error, getToken } from "./Redux/Action/Action";
//  import Load_User from "./Helper/loadUser";

 const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}

export const NftUser = async (user, walletAddress) => {
    console.log('NEW NFT WALLET ADDRESS:', walletAddress);
    const payload = {
        ...user,
        walletAddress
    }
    try{
        // console.log('NEW_NFTS_USER:',user)
        const res = await axios.post(`${url}/api/auth/nfts`, payload, Headers);
        console.log('NFT USER CREATION SUCCESS',res);
        // dispatch(removeError()); 
    } catch (err) {
        console.log(err)
    }
}