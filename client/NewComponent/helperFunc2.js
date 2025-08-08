import React from "react"
import axios from "axios"
import { setAlert, set_Field_Error, removeError,
  setRegister} from "./Redux/Action/Action"

const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}

export const registerAction = async (value, dispatch)=>{
    console.log('loginValues:', value)
    try{
       const res = await axios.post(`${url}/api/user/nft/register`, value, Headers);
       console.log('NFT Registration successful',res.data?.data);
       console.log('REGISTRATION SUCCESS:', res.data?.message)
       dispatch(setAlert(res.data?.message, 'success'));
       console.log('REGISTRATION_STATUS:', res.data)
       dispatch(removeError());
       dispatch(setRegister(res.data?.data))
    
    } catch (err){
          console.log('RESPONSE_ERROR:', err)
      if (err.response?.data.error === 'User already exists') {

        console.log('NFT registration failed',err.response?.data.error)
           const error = err.response?.data.error
           dispatch(set_Field_Error('username',error));          
  }  else {
    dispatch(setAlert('Server error', 'danger'))
  }
        
    }
    
}
