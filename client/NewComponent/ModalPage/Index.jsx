import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; 
import { ForgotPasswordIndex } from "./ForgotPassword/Index";
import { Modal_Register } from "./RegisterFolder/ModalReg";
import LoginPage from "./LoginPage";
import { useDispatch } from "react-redux";
import { removeError } from "../Redux/Action/Action";
import AccountViewPage from "../PrivatePage/Index";
// import ForgotPasswordView from "./ForgotPassword/PasswordView";
 import './Modal.css'

export const ModalComponent = ({handleClick})=> {
    const [openModal, setOpenModal] = useState(false);
    const [passwordForgot, setPasswordForgot] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [isLoading, setIsLoading] = useState(null);
    
    // console.log('openModal:',openModal)
    // console.log('passwordForgot:',passwordForgot)
   //  useEffect(()=> {
   //    if (passwordForgot){
   //       setIsLoading(true)
   //    }
   //  },[isLoading])
   const dispatch = useDispatch();
     const loginFunc = (value)=>{
        setIsLoggedIn(value)
     };
     const handleLoading = (value)=> {
        setIsLoading(value);
     };
    const onhandleSwitch = ()=>{
        setOpenModal(!openModal);
        dispatch(removeError());
    }
    const onHandleSignUp =()=>{
        setOpenModal((prev) => !prev);
        dispatch(removeError());
    }
   // const onPasswordFunc = (value)=>{
   //    setPasswordForgot(value);
   //    console.log('value:',value) 
   // }
   const handleForgotPassword = ()=>{
      setPasswordForgot(prev=> !prev);
      dispatch(removeError());
   };
   
    return (
        <>  
          <div className="Class">
           
             <LoginPage handleSignUp={onHandleSignUp} 
            onPassword={()=> setPasswordForgot(!passwordForgot)} 
            handleClick={handleClick}
            onLoggedIn={loginFunc}
            onLoading={handleLoading}
            isLoading={isLoading}
            forgot={passwordForgot}
            />
            <Modal_Register onhandleSwitch={onhandleSwitch}
             openModal={openModal}
            />
             {/* <AccountViewPage userLoggedIn = {isLoggedIn}/>  */}
              <ForgotPasswordIndex enable = {passwordForgot} 
             passwordFunc = {handleForgotPassword}
             loading={isLoading}
            onLoad={(value)=> setIsLoading(value)}
            /> 
             
         </div> 
         


         </>

    )
} 