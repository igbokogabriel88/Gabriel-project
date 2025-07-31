import React from "react";
import axios from "axios";
import {removeError, setAlert, loginSuccess, loginFail, loadUser
  } from "./Redux/Action/Action";
  import { set_Error } from "./Redux/Action/Action";
 import Load_User from "./Helper/loadUser";

 const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}

export const nftRegisterAction = async (value, error, dispatch)=>{
    console.log('loginValues:', value)
    try{
       const res = await axios.post(`${url}/api/user/nft/register`, value, Headers);
       console.log('NFT Registration successful',res.data?.data);
       dispatch(removeError());
    
    } catch (err){
          
      if (err.response?.data.error) {

        console.log('NFT registration failed',err.response?.data.error)
           error.username = err.response?.data.error 
           dispatch(set_Error(error));          
  }
          
    }
}





export const nftLogin = async (value,error, dispatch, navigate, location)=>{
    console.log('loginValues:', value)
    try{
        const res = await axios.post(`${url}/api/auth/nft/login`, value, Headers);
        console.log('LOGIN STATUS:', res)
        const user = res.data.data.user;
        const token = res.data.data.token;
        const msg = res.data?.message;
        const from = location.state?.from?.pathname;
        localStorage.setItem('token', token);
        dispatch(loginSuccess(res.data?.data))
        dispatch(setAlert(msg, 'success'));
         dispatch(removeError());
         if (from === "/login" || !from) {
          navigate('/overview')
         } else {
          navigate(from, { replace: true});
         };
        //  navigate('/overview');
         Load_User(dispatch, navigate)
          
         return {payload: res.data}
           } catch (err){
        console.log('NFT Login failed',err.response?.data.error);
        dispatch(loginFail());

        if (err.response?.data.error === 'Incorrect password'){
            error.password = err.response?.data.error || 'Incorrect password'
           };
        
        if  (err.response?.data.error === 'Invalid email'){ 
            error.email = err.response?.data.error || 'Invalid email'
         }
         dispatch(set_Error(error));
         return null;
    }
}


export const resetPassword = async (value, error, dispatch, navigate) => {
  console.log('RESET_PASSWORD:', value)
  try{
    const res = await axios.post(`${url}/api/auth/reset/password-reset`, value, Headers);
      
      const msg = res.data.message
      dispatch(setAlert(msg, 'success'))
       dispatch(removeError());
    
      
  } catch (err){
    
      console.log('NFT Login failed',err.response?.data.error);
         error.email = err.response?.data.error
             dispatch(set_Error(error));
  }

}

export const newPassword = async (value, error, dispatch, navigate) => {
  console.log('NEWPASSWORD:', value);
  try{
    const res = await axios.post(`${url}/api/auth/new-password`, value, Headers);
      
    const msg = res.data.message
    dispatch(setAlert(msg, 'success'))
     dispatch(removeError());
    navigate('/login');
   

  } catch (err) {
    console.log('NEW PASSWORD FAILED ',err.response?.data.error);
    error.password = err.response?.data.error
        dispatch(set_Error(error));
  }
}

export const changePassword = async (value, error, dispatch, navigate) => {
  console.log('NEWPASSWORD:', value);
  try{
    const res = await axios.post(`${url}/api/auth/change-password`, value, Headers);
      
    const msg = res.data.message
    dispatch(setAlert(msg, 'success'))
     dispatch(removeError());
    navigate('/login');
   

  } catch (err) {
    console.log('NEW PASSWORD FAILED ',err.response?.data.error);
    error.password = err.response?.data.error
        dispatch(set_Error(error));
  }

}

export const editProfile = 
async (updatedImage, bio, facebook, instagram, youtube, dispatch, navigate) => {
  const value = {
    updatedImage, bio, facebook, instagram, youtube
  }
  console.log('EDIT_PROFILE:', value);
  try{
    const res = await axios.put(`${url}/api/auth/edit/profile`, value, Headers);
      
    const msg = res.data.message
    console.log('EDIT SUCCESS:', res.data?.userData)
    dispatch(setAlert(msg, 'success'))
     dispatch(removeError());
     navigate('/overview');
   
      return res.data
  } catch (err) {
    console.log('FAILED EDIT PROFILE:', err)
    console.log('EDIT PROFILE FAILED ',err.response?.data.error);
    dispatch(setAlert(err.response?.data.error, 'danger'))
        // dispatch(set_Error(err.response?.data.error));
        return null;
  }
  
}