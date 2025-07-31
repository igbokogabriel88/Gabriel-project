
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_Error, removeError } from "../../Redux/Action/Action"; 
import { newPassword } from "../../helperFunc";
import { FaEnvelope, FaUser, FaLockOpen, FaLock, FaTimes } from "react-icons/fa";
import './NewPassword.css'

const NewPassword = ()=> {
    const [data, setData] = useState({
        new_password: '', comfirm_password: ''
    });
    // const [password1Visible, setPassword1Visible] = useState(true);
    // const [password2Visible, setPassword2Visible] = useState(true);

    const {token} = useParams();
    console.log('TOKEN:', token);
    const dispatch= useDispatch();
    const errors = useSelector(state => state.Error)
    const handleChange =(e)=> {
         const {name, value} = e.target;
         setData({...data, [name]: value})
    };
//     const handlePassword1Change = () => {
//         setPassword1Visible(!password1Visible)
//    } 

//   6

const handleNewPassword = async (e)=>{
    e.preventDefault();
    dispatch(removeError());
    const {new_Password, confirm_Password} = data;
     console.log('NEW PASSWORD :', data)
      const error = {};
     

  
 const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  
 
if ( !new_Password || new_Password?.trim() === ''){
        error.password = 'Password is required';    
          } else if (!passwordRegex.test(new_Password)) {
            error.password = 'Password must be valid';
             };

    if ( !confirm_Password || confirm_Password?.trim() === ''){
     error.confirmPassword = 'Please confirm your password';    
    } else if (new_Password != confirm_Password) {
    error.confirmPassword = 'Password does not match';
   };
                    
      
      console.log('NEW PASSWORD ERROR:', error)
      dispatch(set_Error(error))

      
   if (Object.keys(error).length > 0) {
    console.log('ANOTHER NEW PASSWORD ERROR:', error)
     return ;
   }
   dispatch(removeError());
  //  console.log('ANOTHER LOGIN ERROR:', error)
  
   await newPassword({new_Password, token}, Error, dispatch, navigate )      
   }; 
  
    
    return (
        <div className="passwordsNew">
            <div className="password-wrapper">
                <span className="password-title">
                    Create New Password
                </span>
                <form className="password-forms" onSubmit={handleNewPassword}>
                  
       <div className="newPassword">
        <label htmlFor="new-password">Password</label>
        <input type= 'password'
        id="new-password"
        name="new_password"
        value={data.new_password}
        onChange={handleChange}/>
        {/* <span className="icon">{password1Visible ? 
            <FaLock onClick={handlePassword1Change}/> :
             <FaLockOpen onClick={handlePassword1Change}/>}</span> */}
        </div>
        {errors?.password && 
        <span style={{color: 'red', marginTop: '-44px', 
         marginLeft: '-54px', position: 'absolute',
        
        }}>
            {errors.password}</span>}
        <div className="new-password-confirm" change>
        <label htmlFor="new-password">Comfirm Password</label>
        <input type='password'
        id="confirm-password"
        name="confirm_password"
        value={data.confirm_Password}
        onChange={handleChange}/>
        {/* <span className="icon">{password2Visible ? 
            <FaLock onClick={handlePassword2Change}/> :
             <FaLockOpen onClick={handlePassword2Change}/>}</span> */}
        </div>
        {errors?.confirmPassword &&
        <span style={{color: 'red', marginTop: '32%', position: 'absolute'}}>
            {errors.confirmPassword}</span>} 
        <input type="submit" value='Create New password' className="submitClass"/>
                </form>
            </div>
        </div>
    )
}
export default NewPassword