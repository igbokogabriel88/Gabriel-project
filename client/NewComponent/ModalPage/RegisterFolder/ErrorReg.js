import { set_Error } from "../../Redux/Action/Action";

export const errorFunc = (userData, error, emailRegex, passwordRegex)=>{
   console.log('REGISTRATION_DATA:', userData); 
  const {username, email, password, confirm_password} = userData;
   
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    //  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-*z\d@$!%*?&]{6,}$/

    if ( !username || username?.trim === ''){
      error.username = 'Username is required';
    } else if(username.length < 3){
     error.username = 'Username must be at least 3 characters'
    } else if ( username || username.trim() != ''){
      error.username = ''
    }

    if ( !email || email?.trim === ''){
      error.email = 'Email is required';
    } else if (!emailRegex.test(email)){
      error.email = 'Invalid email address';
      };

if ( !password || password?.trim() === ''){
  error.password = 'Password is required';    
    } else if (!passwordRegex.test(password)) {
      error.password = 'Password must be valid';
       };

if (!confirm_password?.trim()){
    error.confirmPassword = 'Please confirm your password';    
    } else if (password != confirm_password) {
    error.confirmPassword = 'Password do not match'
   }
   
      }


  
export const validateError = (name, value, Error, emailRegex) => {
     
  console.log('ERROE_NAME:', name);
  console.log('ERROR_VALUE:', value);
  console.log('ERROR_MESSAGE:', Error)

  if ( name === 'username' && value?.trim === ''){
    Error.username = 'Username is required';
  }; 
  
  if (name === 'email' && !emailRegex.test(email)){
    Error.email = 'Valid email is required'
  };

  if (name === 'password' && value.length < 6) {
    Error.password = ' Password must be at least 6 characters'
  }

  if (name === 'confirm_password' && value.length < 6) {
    Error.confirm_password = ' Password must be at least 6 characters'
  }

}
        //              }
         
    // switch (name) {
    //      case  'username':
    //         if (!username?.trim()){
    //             errors.username = 'Username is required'
    //         }
    //         else if(username.length < 3){
    //             errors.username = 'Username must be at least 3 characters'
    //         } else {
    //            errors.username = '';
    //         }
    //         case 'email' :
    //           const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    //           if (!email?.trim()){
    //             errors.email = 'Email is required';
    //           }
    //            else if (!emailRegex.test(email)){
    //              errors.email = 'Invalid email address';
    //              }  else {
    //                 errors.email = '';
    //           }
    //         case 'password' : {
    //      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    //         if (!password?.trim()){
    //           errors.password = 'Password is required';    
    //             }
    //       else if (!passwordRegex.test(password)) {
    //            errors.password = 'Password must be valid'
    //             } else {
    //             errors.password = '';
    //              }
    //         }
    //         case 'confirmPassword' : {
    //              if (!confirm_password?.trim()){
    //                errors.confirmPassword = 'Please confirm your password';    
    //                  }
    //            else if (password != confirm_password) {
    //                 errors.confirmPassword = 'Password do not match'
    //                  } else {
    //                  errors.confirmPassword = '';
    //                   }
    //              }
            
    //         dafault : 
    //         return null
    // }
    // console.log('nftName:', name)
    // console.log('userData:', userData)
    // console.log('nftError:', errors)
    // dispatch(set_Error(errors));


// export const handleErrorReg = (username, email, password, confirmPassword, Error, userError, dispatch) => {

//     const error = {};

//     if (!username) error.username = 'Username is required';
//     if (!email) error.email = 'Email is required';
//     if (!password) error.password = 'Password is required';
//     if (!confirmPassword) error.confirmPassword = 'Please Confirm your password';
//     if (password != confirmPassword) error.confirmPassword = 'Password do not match';
//     if (userError === true) error.username = 'User already exists'

//     if (Error){
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
//             case 'auth/email-already-in-use': 
//             error.email = 'Email already in use';
//             break;
//             case 'auth/weak-password': 
//             error.password = 'Password is too weak';
//             break;
//             default :
//             error.general = 'An unknown error occured';
//         }
//     }
//        console.log('errReg:', error)
//        dispatch(set_Error(error))
//        console.log('firebaseErrorz:', firebaseError )
// }




// const usernameRef = doc(db, "usernames", username);
// const usernameSnap = await getDoc(usernameRef);
// if (usernameSnap.exists) {
// userError = true;
// handleErrorReg(username, email, password, confirm_password, null, userError, dispatch);
// console.log('hello Gabriel')
// return;
// }

// try{
// const userCredential = await createUserWithEmailAndPassword(auth, email, password);

// await updateProfile(userCredential.user, {displayName: username});

//  const uid = userCredential.user.uid;
//  const userRef = doc(db, 'users', uid);

//  await setDoc(userRef, {
//   uid: uid,
//   username: username,
//   email: email,
//   createdAt: new Date()
//  });


// await setDoc(usernameRef, {
// uid: uid,
// username: username,
// email: email
// });
// dispatch(setAlert('Registration successful', 'success'));
// consle.log('reistration success is triggered')
// } catch (err) {
// console.log('catch blocked triggered')
// console.log('regErrorz:', err)
//   handleErrorReg(username, email, password, confirm_password, err, userError, dispatch);
// }
