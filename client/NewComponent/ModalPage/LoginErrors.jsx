import React from "react";

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

  export const loginValidate = (name, value, error, emailRegex) => {
     
    
    if (name === 'email' && !emailRegex.test(email)){
      Error.email = 'Valid email is required'
    };
  
    if (name === 'password' && value.length < 6) {
      Error.password = ' Password must be at least 6 characters'
    }
  
    6
  }