
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_Error, removeError } from "../../Redux/Action/Action"; 
import { newPasswordPage } from "../../helperFunc";
import { errorNewPassword } from "../../ModalPage/LoginErrors";
import { FaEnvelope, FaUser, FaLockOpen, FaLock, FaTimes } from "react-icons/fa";
import './NewPassword.css'

const NewPassword = ()=> {
    const [data, setData] = useState({
        newPassword: '', comfirmNewPassword: ''
    });
    
    // const {token} = useParams();
    // console.log('TOKEN:', token);
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const errors = useSelector(state => state.Error);
    const {token} = useSelector(state => state.getToken);
    const newToken = token?.data.token;
    console.log('NEW_REDUX_TOKEN:', newToken);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/


    const handleChange =(e)=> {
         const {name, value} = e.target;
         setData({...data, [name]: value})

         errorNewPassword(name, value, passwordRegex, dispatch)
    };

const handleNewPassword = async (e)=>{
    e.preventDefault();
    dispatch(removeError());
    const {newPassword, confirmNewPassword} = data;
     console.log('NEW PASSWORD :', data)
      const error = {};
       
 
      if ( !newPassword || newPassword?.trim() === ''){
        error.newPassword = 'Password is required';    
          } else if (!passwordRegex.test(newPassword)) {
            error.newPassword = 'Password must be valid';
             } else { error.newPassword = ''};

    if ( !confirmNewPassword || confirmNewPassword?.trim() === ''){
     error.confirmNewPassword = 'Please confirm your password';    
    } else if (newPassword != confirmNewPassword) {
    error.confirmNewPassword = 'Password does not match';
   } else { error.confirmNewPassword = ''};
                    
    dispatch(set_Error(error))

    const hasErrors = Object.values(error).some(err => err !== '');
    if (hasErrors) {
    console.log('BLOCKING SUBMIT DUE TO ERRORS')
    dispatch(set_Error(error))
    return;
    }   
   
   dispatch(removeError());
    const newValue = {newPassword, newToken}
  
   await newPasswordPage(newValue, dispatch )
   
   setData({...data,
      newPassword: '', confirmNewPassword: ''
    });
//  console.log('ERRORS_ERROR:', errors)
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
        name="newPassword"
        value={data.newPassword}
        onChange={handleChange}/>
        {/* <span className="icon">{password1Visible ? 
            <FaLock onClick={handlePassword1Change}/> :
             <FaLockOpen onClick={handlePassword1Change}/>}</span> */}
        </div>
        {errors?.newPassword && 
        <span style={{color: 'red', marginTop: '-44px', 
         marginLeft: '-54px', position: 'absolute',
        
        }}>
            {errors.newPassword}</span>}
        <div className="new-password-confirm" change>
        <label htmlFor="new-password">Comfirm Password</label>
        <input type='password'
        id="confirm-password"
        name="confirmNewPassword"
        value={data.confirmNewPassword}
        onChange={handleChange}/>
        {/* <span className="icon">{password2Visible ? 
            <FaLock onClick={handlePassword2Change}/> :
             <FaLockOpen onClick={handlePassword2Change}/>}</span> */}
        </div>
        {errors?.confirmNewPassword &&
        <span style={{color: 'red', marginTop: '32%', position: 'absolute'}}>
            {errors.confirmNewPassword}</span>} 
        <input type="submit" value='Create New password' className="submitClass"/>
                </form>
            </div>
        </div>
    )
}
export default NewPassword