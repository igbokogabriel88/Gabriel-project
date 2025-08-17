import React from "react";
import axios from "axios";
import { USER_LOADED, LOGOUT } from "../Redux/Action/ActionType"; 
import { removeError } from "../Redux/Action/Action";
// import { removeError, set_Error } from "./Redux/Action/Action";
import Load_User from "./loadUser";
import { NftsUser } from "./nftsuser";
import { createNftsUser } from "./HelperNft"; 
import { setAlert } from "../Redux/Action/Action";

 const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}

export const nftRegisterAction = async (value, dispatch)=>{
    console.log('loginValues:', value)
    try{
       const res = await axios.post(`${url}/api/user/nft/register`, value, Headers);
       console.log('NFT Registration successful',res.data?.data);
       console.log('NFT_USER_CREATED:', res.data?.data.user)
       dispatch(setAlert(res.data?.msg, 'success'));
       await NftsUser(res.data?.data.user)
       dispatch(removeError());
    
    } catch (err){
          
          if (err.response?.data.error) {

            console.log('NFT registration failed',err.response?.data.error)
          const backendMsg = err.response?.data.error
          const backendError = {
            username: backendMsg
          };

            dispatch(set_Error({username: backendMsg}))
          }
          
    }
}


export const nftLogin = async (value,error, dispatch)=>{
    console.log('loginValues:', value)
    try{
        const res = await axios.post(`${url}/api/auth/nft/login`, value, Headers);
         dispatch(removeError());
        const user = res.data.data.user;
        const token = res.data.data.token;
        const msg = res.data.message
        localStorage.setItem('token', token)
        localStorage.setItem('User', user)
        Load_User(dispatch)
        console.log('userToken:',token)
        console.log('User:',user)
    } catch (err){
        console.log('NFT Login failed',err.response?.data.error)
        if (err.response?.data.error === 'Incorrect password'){
            error.password = err.response?.data.error
           };
        
        if  (err.response?.data.error === 'Invalid email'){ 
            error.email = err.response?.data.error
         }
         dispatch(set_Error(error));
    }
}