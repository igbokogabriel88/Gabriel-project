import { set_Error, set_Field_Error, removeError} from "../../Redux/Action/Action";

 
export const errorFunc = (userData, error, emailRegex, passwordRegex, dispatch)=>{
  const {username, email, password, confirmPassword} = userData;
   
  console.log('REGISTRATION_DATA:', userData);
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    //  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-*z\d@$!%*?&]{6,}$/

    if ( !username || username?.trim === ''){
      error.username = 'Username is required';
    } else if(username.length < 3){
     error.username = 'Username must be at least 3 characters'
    } else {
      error.username = ''
    }

    if ( !email || email?.trim === ''){
      error.email = 'Email is required';
    } else if (!emailRegex.test(email)){
      error.email = 'Invalid email address';
      } else {error.email = ''}

if ( !password || password?.trim() === ''){
  error.password = 'Password is required';    
    } else if (!passwordRegex.test(password)) {
      error.password = 'Password must be valid';
       } else { error.password = ''}
    
       if (!confirmPassword || confirmPassword?.trim() === ''){
        error.confirmPassword = 'Please confirm your password';
    } else if (password != confirmPassword) {
    error.confirmPassword = 'Password do not match'
   } else { error.confirmPassword = ''}
     console.log('ERROR_REGISTRATION:',error)
     
      }


      export const errorChangePassword = (userData, error, passwordRegex, dispatch)=>{
        const {oldPassword, newPassword, confirmNewPassword} = userData;
         
        console.log('REGISTRATION_DATA:', userData);
          // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          //  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-*z\d@$!%*?&]{6,}$/
      
          if (!oldPassword || oldPassword?.trim === ''){
            error.oldPassword = 'Password is required';
          } else if(oldPassword.length < 6){
           error.oldPassword = 'Password must be at least 6 characters'
          } else if (!passwordRegex.test(oldPassword)) {
            error.oldPassword = 'Password must be valid';
             }else {
            error.oldPassword = ''
          }

          if ( !newPassword || newPassword?.trim === ''){
            error.newPassword = 'Password is required';
          } else if(newPassword.length < 6){
           error.newPassword = 'Password must be at least 6 characters'
          } else if (!passwordRegex.test(newPassword)) {
            error.newPassword = 'Password must be valid';
             }else {
            error.newPassword = ''
          }
          
          if (!confirmNewPassword || confirmNewPassword?.trim() === ''){
            error.confirmNewPassword = 'Please confirm your new password';
          } else if (newPassword != confirmNewPassword) {
          error.confirmNewPassword = 'Password do not match'
         } else { error.confirmNewPassword = ''}
           console.log('ERROR_REGISTRATION:',error)
           
            }
      
      

  
export const validateError = (name, value, emailRegex, dispatch) => {
  console.log('ERROE_NAME:', name);
  console.log('ERROR_VALUE:', value);
  
     if(name === 'email'){
      if(value.trim() === '') {
        dispatch(set_Field_Error('email', 'Email is required'));
      } else if (!emailRegex.test(value)){
        dispatch(set_Field_Error('email', 'Invalid email format'));
      } else
       { dispatch(set_Field_Error('email', '')); }
     } else if (name === 'username') { 
         if (value.trim() === '') {
          dispatch(set_Field_Error('username', 'Username is required'));
         } else if (value.length < 3){
          dispatch(set_Field_Error('username', 'Username must be at least 3 character'));
         } else {
          dispatch(set_Field_Error('username', ''));
         }
     } else if (name === 'password') { 
      if (value.trim() === '') {
       dispatch(set_Field_Error('password', 'Password is required'));
      } else if (value.length < 6){
       dispatch(set_Field_Error('password', 'Password must be at least 6 character'));
      } else {
       dispatch(set_Field_Error('password', ''));
      }
      } else{
     if (value.length < 6) {
     dispatch(set_Field_Error('confirmPassword', 'Confirm password is too short'));
      } else if (value.trim() === '') {
        dispatch(set_Field_Error('confirmPassword', 'Confirm password is required'));
      } else {
     dispatch(set_Field_Error('confirmPassword', ''));
     }
    }  
  }


