import React from 'react'
import { set_Error } from "../Redux/Action/Action";


export  const errorLogin = (name, userData, errors, dispatch)=>{
  console.log('ERROR LOGIN FUNCTION IS TRIGGERED:',userData)
  cosnsole.log('ERROR DATA OBJECT IS:', userData)
  console.log('USERDATA EMAIL IS:', userData.email)
    const { email, password} = userData;
  // const errors = {};

    switch (name) {
         
            case 'email' :
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              if (!email?.trim()){
                errors.email = 'Email is required';
              }
               else if (!emailRegex.test(email)){
                 errors.email = 'Invalid email address';
                 }  else {
                    errors.email = '';
              }
            case 'password' : {
         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
            if (!password?.trim()){
              errors.password = 'Password is required';    
                }
          else if (!passwordRegex.test(password)) {
               errors.password = 'Password must be valid'
                } else {
                errors.password = '';
                 }
            }
            
            
            dafault : 
            return null
    }
}

  

// export const handleErrorLogin = (email, password, firebaseError, dispatch) => {
    
//      const error = {};
//      console.log('firebaseError:', firebaseError)

//      if (!email) error.email = 'Email is required';
//     if (!password) error.password = 'password is required';
     
//     if (firebaseError){
//         switch (firebaseError.code) {
//             case 'auth/invalid-email': 
//             error.email = 'Invalid email';
//             break;
//             case 'auth/user-not-found' :
//                 error.email = 'No account found with this email';
//                 break;
//             case 'auth/wrong-password' : 
//             error.password = 'Incorrect password';
//             break;
//             case 'auth/weak-password': 
//             error.password = 'Password is too weak';
//             break;
//             default :
//             error = null;
//         }
//     }
//        console.log('ErrorLogin:', error);
//        dispatch(set_Error(error))
// }