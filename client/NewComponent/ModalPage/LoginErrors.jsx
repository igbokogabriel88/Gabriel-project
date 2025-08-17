import React from "react";
import { set_Field_Error } from "../Redux/Action/Action";

export const ErrorFunction = (userData) => {
        
    // console.log('USERDATA:', userData)
    // console.log('USEREMAIL:', userData?.email);
    // console.log('PASSWORD:', data.password)

    const errors = {};
    const { email, password} = userData;
    console.log('ERROR PASSWORD:', password);
    console.log('ERROR EMAIL:', email);
      
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    if (!email || email?.trim === ''){
                errors.email = 'Email is required';
              }
            else {
                    errors.email = '' };
        
         if (!password || password?.trim() === ''){
            errors.password = 'Password is required';    
            console.log('ERROR PASSWORD:', errors.password);
              }
          else {
                errors.password = '';
                 }
            
            
            dafault :
            return null
    
    return errors;
     console.log('loginDatas:', userData)
     console.log('loginErrors:', errors)
    
}

export const ErrorLoginValidation = (name, value, emailRegex, dispatch) => {
  // console.log('ERROE_NAME:', name);
  // console.log('ERROR_VALUE:', value);
  
     if(name === 'email'){
      if(value.trim() === '') {
        dispatch(set_Field_Error('email', 'Email is required'));
      } else if (!emailRegex.test(value)){
        dispatch(set_Field_Error('email', 'Invalid email format'));
      } else
       { dispatch(set_Field_Error('email', '')); }
     }   else{
     if (value.length < 6) {
     dispatch(set_Field_Error('password', 'Password should be at least 6 characters'));
      } else if (value.trim() === '') {
        dispatch(set_Field_Error('password', 'Please Password is required'));
      } else {
     dispatch(set_Field_Error('password', ''));
     }
    }  
  };

  export const errorNewPassword = (name, value, passwordRegex, dispatch) => {
    console.log('ERROE_NAME:', name);
    console.log('ERROR_VALUE:', value);
    
       if(name === 'newPassword'){
        if(value.trim() === '') {
          dispatch(set_Field_Error('newPassword', 'Password is required'));
        } else if (!passwordRegex.test(value)){
          dispatch(set_Field_Error('newPassword', 'Password is invalid'));
        }else if (value.length < 6){
          dispatch(set_Field_Error('newPassword', 'Password must be at least 6 characters'));
        } else
         { dispatch(set_Field_Error('newPassword', '')); }
       }   else{
       if (value.length < 6) {
       dispatch(set_Field_Error('confirmNewpassword', 'Password should be at least 6 characters'));
        } else if (value.trim() === '') {
          dispatch(set_Field_Error('confirmNewPassword', 'Please Password is required'));
        } else if (!passwordRegex.test(value)) {
          dispatch(set_Field_Error('confirmNewPassword', 'Ivalid password format'));
        }else {
       dispatch(set_Field_Error('confirmNewPassword', ''));
       
      }  
    }
  }

  export const ErrorResetPassword = (name, value, emailRegex, dispatch) => {
    if (value.trim() === '') {
      dispatch(set_Field_Error('email', 'Email is required'));
       } else if (!emailRegex.test(value)) {
        dispatch(set_Field_Error('email', 'Invalid email format'));
       } else {
      dispatch(set_Field_Error('email', ''));
      }
 
  };

  export const ErrorSubscribeEmail = (name, value, emailRegex, dispatch) => {
    if (value.trim() === '') {
      dispatch(set_Field_Error('email', 'Email is required'));
       } else if (!emailRegex.test(value)) {
        dispatch(set_Field_Error('email', 'Invalid email format'));
       } else {
      dispatch(set_Field_Error('email', ''));
      }
 
  };


  

  export const ErrorChangePassword = (name, value, dispatch) => {
    console.log('ERROE_NAME:', name);
    console.log('ERROR_VALUE:', value);
    
       if(name === 'oldPassword'){
        if(value.trim() === '') {
          dispatch(set_Field_Error('oldPassword', 'Old password is required'));
        } else if (value.length < 6){
          dispatch(set_Field_Error('oldPassword', 'Password should be at least 6 characters'));
        } else
         { dispatch(set_Field_Error('oldPassword', '')); }
       }  else if (name === 'newPassword') { 
        if (value.trim() === '') {
         dispatch(set_Field_Error('newPassword', 'Password is required'));
        } else if (value.length < 6){
         dispatch(set_Field_Error('newPassword', 'Password must be at least 6 character'));
        } else {
         dispatch(set_Field_Error('newPassword', ''));
        }
    }  else{
      if (value.length < 6) {
      dispatch(set_Field_Error('confirmNewPassword', 'Password should be at least 6 characters'));
       } else if (value.trim() === '') {
         dispatch(set_Field_Error('confirmNewPassword', 'Please confirm your password'));
       } else {
      dispatch(set_Field_Error('confirmNewPassword', ''));
      }
     }  
    }
  