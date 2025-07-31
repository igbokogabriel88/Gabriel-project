import React, {useState, useEffect} from "react";
import { FaEnvelope, FaUser, FaLockOpen, FaLock, FaTimes } from "react-icons/fa";

import { set_Error, removeError } from "../../Redux/Action/Action";
import { setAlert} from "../../Redux/Action/Action";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../helperFunc2";
import { errorFunc, validateError } from "./ErrorReg";
import './Register.css'


const RegisterPage = ({handleSignIn, handleClick, openModal}) => {
    const [password1Visible, setPassword1Visible] = useState(true);
    const [password2Visible, setPassword2Visible] = useState(true);
    const [data, setData] = useState({username : '', email: '', password: '',
    confirm_password:''});
    // const db = getFirestore();
    const file = null;
    const dispatch = useDispatch();
    const errors = useSelector(state => state.Error);
    const alerts = useSelector(state => state.Alert);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    const error = {};
     const Error = {};
    
    // useEffect(()=> {
    //   if (result) {
    //     handleSignIn
    //   }
    // },[result])

    const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
    validateError(name, value, Error, emailRegex)
          dispatch(set_Error(Error))
         }

    const handlePassword1Change = () => {
    setPassword1Visible(!password1Visible)
       } 

       const handlePassword2Change = () => {
        setPassword2Visible(!password2Visible)
   };

   
   const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch(removeError());
    const {username, email, password, confirm_password} = data;
      
    await errorFunc(data, error, emailRegex, passwordRegex)
    dispatch(set_Error(error))
 
    if (Object.keys(error).length > 0) {
    return ;
    }

   dispatch(removeError());
   console.log('ANOTHER LOGIN ERROR:', error)

    let result;
    result = await  registerAction({username, email, password}, error, dispatch);
   console.log('Registration success')
    console.log('RESULT:', result)
   setData({
   username: '', email: '', password: '', confirm_password: ''
   })
    
   };
                                    
    return (   
          <>
          <div className= {`containerLog ${ openModal ? 'open' : 'close'}`}>
          <span ><FaTimes onClick={handleClick}
             className='iconClass'/></span> 
          <div className="mainGroup">    
        <div className="title">Create  Account</div>
        <form className="formClass" onSubmit={handleSubmit}>
        <div className="formGroup"> <label htmlFor="username">Username</label>
        <input type="text"
        id="username"
        name="username"
        placeholder="Provide your username"
        value={data.username}
        onChange={handleChange}
        />
        <FaUser className="icon"/>
        </div>
        {errors?.username && 
        <span style={{color: 'red', marginTop: '-24px', position: 'absolute'}}>{errors.username}</span>}
        
        <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input type="email"
        id="email"
        name="email"
        placeholder="Provide your email address"
        value={data.email}
        onChange={handleChange}/>
        <FaEnvelope className="icon"/>
        </div>
        {errors?.email && 
        <span style={{color: 'red', marginTop: '-24px', position: 'absolute'}}>
          {errors.email}</span>}
   
        
        <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input type={password1Visible? 'password': text}
        id="password"
        name="password"
        placeholder="your password is needed"
        value={data.password}
        onChange={handleChange}/>
        <span className="icon">{password1Visible ? 
            <FaLock onClick={handlePassword1Change}/> :
             <FaLockOpen onClick={handlePassword1Change}/>}</span>
         </div>
         {errors?.password && 
             <span style={{color: 'red', marginTop: '-24px', position: 'absolute'}}>
              {errors.password}</span>}
       

        <div className="formGroup">
        <label htmlFor="confirm">ConfirmPassword</label>
        <input type={password2Visible? 'password': 'text'}
        id="confirm_password"
        name="confirm_password"
        placeholder="Confirm your password"
        value={data.confirm_password}
        onChange={handleChange}/>
        <span className="icon">{password2Visible ? 
            <FaLock onClick={handlePassword2Change}/> :
             <FaLockOpen onClick={handlePassword2Change}/>}</span>
         </div>
         {errors?.confirmPassword && 
             <span style={{color: 'red', marginTop: '-24px', position: 'absolute'}}>
              {errors.confirmPassword}</span>}
       

        <input type="submit" value='Sign up' className="submitClass"/>
        <span className="signupSwitch">
         <p>Already have an account?</p>
         <span className="signupClass" onClick={handleSignIn}> SignIn</span>
            </span>
        
        </form>
        {alerts && <span>{alerts.message}</span>}
        </div>
     </div>
     </>
 )
}
export default RegisterPage