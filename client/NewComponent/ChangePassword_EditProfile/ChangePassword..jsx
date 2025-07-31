import React, { useState } from "react";
import { FaEnvelope, FaUser, FaLockOpen, FaLock, FaTimes } from "react-icons/fa";
import './index.css'

const ChangePassword = ()=> {
    const [data, setData] = useState({old_password: '',
        new_password: '', comfirm_password: ''
    });
    const [password1Visible, setPassword1Visible] = useState(true);
    const [password2Visible, setPassword2Visible] = useState(true);
    const handleChange =(e)=> {

    };
    const handlePassword1Change = () => {
        setPassword1Visible(!password1Visible)
   }    
   const handlePassword2Change = () => {
    setPassword2Visible(!password2Visible)
}      
    return (
        <div className="passwordsClass change">
            <div className="password-wrapper">
                <span className="password-title">
                    Change Password
                </span>
                <div className="password-form">
                <div className="old-password">
                <label htmlFor="old-password">
                    Old password
                </label>
                <input
                type="text"
                name="old_password"
                id="old-password"
                value={data.old_password}
                onChange={handleChange}
                className="style-exhibit"
                placeholder="Current password"
                />
                </div>  
       <div className="new-password">
        <label htmlFor="new-password">New Password</label>
        <input type={password1Visible? 'password': 'text'}
        id="new-password"
        name="new_password"
        placeholder="New password"
        value={data.new_password}
        onChange={handleChange}/>
        <span className="icon">{password1Visible ? 
            <FaLock onClick={handlePassword1Change}/> :
             <FaLockOpen onClick={handlePassword1Change}/>}</span>
        </div>
        <div className="new-password" change>
        <label htmlFor="new-password">Comfirm Password</label>
        <input type={password1Visible? 'password': 'text'}
        id="confirm-password"
        name="confirm_password"
        placeholder="Comfirm password"
        value={data.confirm_password}
        onChange={handleChange}/>
        <span className="icon">{password2Visible ? 
            <FaLock onClick={handlePassword2Change}/> :
             <FaLockOpen onClick={handlePassword2Change}/>}</span>
        </div>
        <input type="submit" value='Sign In' className="submitClass signIn"/>
                </div>
            </div>
        </div>
    )
}
export default ChangePassword