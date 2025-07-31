import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loaders from "../LoadingSpinner/Loader";
// import { auth } from "../FirebaseStore/Firebase";
import { set_Error, removeError, setAlert } from "../Redux/Action/Action";
import { useDispatch, useSelector } from "react-redux";
import RectangularLoader from "../LoadingSpinner/RectangularLoader";
import { Classic_Spinner } from "../LoadingSpinner/CircularSpinner/ClassicSpinner";
import { Spinner } from "../LoadingSpinner/CircularSpinner/Spinner";
import Load_User from "../Helper/loadUser";
import { loginValidate } from "./LoginErrors";

import { FaEnvelope, FaUser, FaLockOpen, FaLock, FaTimes } from "react-icons/fa";
import { nftLogin } from "../helperFunc";


const LoginPage = ({handleSignUp, forgot,
    onLoading, isLoading,
    handleClick, onPassword, onLoggedIn}) => {

    const [userData, setUserData] = useState({ email: '', password: ''});
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
      const [isLoad, setIsLoad] = useState(false);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const location = useLocation();
     const errors = useSelector(state => state.Error);
      console.log('reduxError:', errors)
     const alerts = useSelector(state => state.Alert);
     const {isAuthenticated, loading} = useSelector(state => state.Auths);
     const error = {};     
     const Error = {};

         useEffect(()=> {
         if(!forgot && isLoad){
            setIsLoad(false)
         };
        //  console.log('loading&&forgot:', loading)
      },[forgot, isLoad]);

      useEffect(()=>{
         if (isAuthenticated && !loading){
            navigate('/overview')
         }
      },[isAuthenticated, loading, navigate]);

       useEffect(()=>{
         onLoggedIn(userLoggedIn)
       },[userLoggedIn])
       useEffect(()=>{
           onLoading(isLoad);
       },[isLoad])   
         const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});

        loginValidate(name, value, error, emailRegex)
        dispatch(set_Error(error))     
         }  
           
         const handlePasswordChange = () => {
              setPasswordVisible(!passwordVisible)
            //   console.log('passwordVisible:', passwordVisible)
         }    
         const handleForgot = ()=> {
            onPassword()
            setLoading(true);
       }   
       const handleSubmit = async (e)=>{
        e.preventDefault()
        dispatch(removeError());
        const data = userData;
        // console.log('LOGIN DATA:', data)
          const error = {};
         const { email, password} = userData;
         setUserLoggedIn(!userLoggedIn);
         
    
      
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

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
          
        //  console.log('LOGIN_ERROR:', error)
          dispatch(set_Error(error))
 
          
       if (Object.keys(error).length > 0) {
        // console.log('ANOTHER LOGIN ERROR:', error)
         return ;
       }
       dispatch(removeError());
      //  console.log('ANOTHER LOGIN ERROR:', error)
      
       await nftLogin({email, password}, Error, dispatch, navigate, location )      
       }; 
      
                   
    return (
     <div className="containerReg signIn">
          <span ><FaTimes onClick={handleClick}
             className='iconClass'/></span>
          <div className="mainGroup signIn">
        <div className="title">Sign In</div>
        <form className="formClass" onSubmit={handleSubmit}>
        
        <div className="formGroup signIn">
        <label htmlFor="email">Email</label>
        <input type="email"
        id="email"
        name="email"
        placeholder="Provide your email address"
        value={userData.email}
        onChange={handleChange}/>
        <FaEnvelope className="icon"/>
        
        </div>
        {errors && errors?.email &&
        <span style={{color: 'red', marginTop: '-26px', position: 'absolute'}}>
         {errors.email} </span>}
       
        <div className="formGroup signIn">
        <label htmlFor="password">Password</label>
        <input type={passwordVisible? 'password' : 'text'}
        id="password"
        name="password"
        placeholder="Your password is needed"
        value={userData.password}
        onChange={handleChange}/>
        <span className="icon">{passwordVisible ? 
            <FaLock onClick={handlePasswordChange}/> :
            <FaLockOpen onClick={handlePasswordChange}/>}</span>
        </div>
        {errors && errors?.password &&
        <span style={{color: 'red', marginTop: '-26px', position: 'absolute'}}>{errors.password} </span>}
       

        <span className="forgotPassword"><span>Forgot Password?</span> 
            <p onClick={handleForgot}>Click here</p></span> 
        <input type="submit" value='Sign In' className="submitClass signIn"/>
        <span className="signupSwitch">
         <p>Do not have an account?</p>
         <span className="signupClass" onClick={handleSignUp}> Sign Up</span>
            </span>
        
        </form>
        {/* <span>{alerts.message}</span> */}
         {/* <Loaders/>  */}
        {/* <RectangularLoader/> */}
        {/* <Spinner/> */}
         {/* <Classic_Spinner/>  */}
         <div>
            
         </div>
   
        </div>
     </div> )
}
export default LoginPage