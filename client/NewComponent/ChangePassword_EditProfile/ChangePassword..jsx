import React, { useState } from "react";
import { ErrorChangePassword } from "../ModalPage/LoginErrors";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_Error, removeError } from "../Redux/Action/Action";
import { errorChangePassword } from "../ModalPage/RegisterFolder/ErrorReg";
import { changePassword } from "../helperFunc";
import { FaEnvelope, FaUser, FaLockOpen, FaLock, FaTimes } from "react-icons/fa";
import './index.css'


const ChangePassword = ()=> {
    const [data, setData] = useState({oldPassword: '',
        newPassword: '', comfirmNewPassword: ''
    });
    const [password1Visible, setPassword1Visible] = useState(true);
    const [password2Visible, setPassword2Visible] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errors = useSelector(state => state.Error);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/


    const handleChange =(e)=> {
           const {name, value} = e.target;
           setData({...data, [name] : value});

           ErrorChangePassword(name, value, dispatch)
    };

    const handlePassword1Change = () => {
        setPassword1Visible(!password1Visible)
   }    
   const handlePassword2Change = () => {
    setPassword2Visible(!password2Visible)
};
   const handleSubmit =  async (e) => {
    e.preventDefault();
    dispatch(removeError());
     const {oldPassword, newPassword, confirmNewPassword} = data;

    const error = {};
   
    await errorChangePassword(data, error, passwordRegex);
    console.log('ERRORS PASSWORD CHANGE:', error)

    const hasErrors = Object.values(error).some(err => err !== '');
    if (hasErrors) {
        console.log('BLOCKING SUBMIT DUE TO ERRORS')
        dispatch(set_Error(error))
        return;
    }

    dispatch(removeError());
    console.log('ANOTHER PASSWORD CHANGE ERROR:', error)
        const dataValue = { oldPassword, newPassword};
       
     await  changePassword(dataValue, dispatch);
 
    setData({...data,
    oldPassword: '', newPassword: '', confirmNewPassword: ''
    });
    // console.log('ERRORS_ERROR:', errors)
     
   } 

    return (
        <div className="passwordsClass change">
            <div className="password-wrapper">
                <span className="password-title">
                    Change Password
                </span>
                <form className="password-form" onSubmit={handleSubmit}>
                <div className="old-password">
                <label htmlFor="old-password">
                    Old password
                </label>
                <input
                type="password"
                name="oldPassword"
                id="old-password"
                value={data.oldPassword}
                onChange={handleChange}
                className="style-exhibit"
                placeholder="Current password"
                />
                </div>  
                {errors?.oldPassword && 
        <span style={{color: 'red', position: 'relative',
         marginLeft: '34px', marginTop: '12px'}}>{errors.oldPassword}</span>}

       <div className="new-password">
        <label htmlFor="new-password">New Password</label>
        <input type={password1Visible? 'password': 'text'}
        id="new-password"
        name="newPassword"
        placeholder="New password"
        value={data.newPassword}
        onChange={handleChange}/>
        <span className="icon">{password1Visible ? 
            <FaLock onClick={handlePassword1Change}/> :
             <FaLockOpen onClick={handlePassword1Change}/>}</span>
        </div>
        {errors?.newPassword && 
        <span style={{color: 'red', marginTop: '0px',marginLeft: '34px', position: 'relative'}}>
            {errors.newPassword}</span>}

        <div className="new-password" change>
        <label htmlFor="new-password">Comfirm Password</label>
        <input type={password1Visible? 'password': 'text'}
        id="confirm-password"
        name="confirmNewPassword"
        placeholder="Comfirm password"
        value={data.confirmNewPassword}
        onChange={handleChange}/>
        <span className="icon">{password2Visible ? 
            <FaLock onClick={handlePassword2Change}/> :
             <FaLockOpen onClick={handlePassword2Change}/>}</span>
        </div>
        {errors?.confirmNewPassword && 
        <span style={{color: 'red', marginTop: '0px',marginLeft: '34px', position: 'relative'}}>
            {errors.confirmNewPassword}</span>}

        <input type="submit" value='Change password' className="submitClass"/>
                </form>
            </div>
        </div>
    )
}
export default ChangePassword