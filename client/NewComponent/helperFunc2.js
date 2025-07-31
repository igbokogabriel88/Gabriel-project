import React from "react"
import axios from "axios"
import { set_Error, setAlert } from "./Redux/Action/Action"

const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}

export const registerAction = async (value, error, dispatch)=>{
    console.log('loginValues:', value)
    try{
       const res = await axios.post(`${url}/api/user/nft/register`, value, Headers);
       console.log('NFT Registration successful',res.data?.data);
       console.log('REGISTRATION SUCCESS:', res.data?.message)
       dispatch(setAlert(res.data?.message, 'success'));
       dispatch(removeError());
       return res.data  
    } catch (err){
          
      if (err.response?.data.error === 'User already exists') {

        console.log('NFT registration failed',err.response?.data.error)
           error.username = err.response?.data.error 
           dispatch(set_Error(error));          
  }
          dispatch(setAlert('Server error', 'danger'))
          return null;
    }
    
}
