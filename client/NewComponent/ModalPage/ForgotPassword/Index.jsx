import React, {useEffect, useState} from "react";
import ForgotPasswordPage from "./ForgetPassword";
import RectangularLoader from "../../LoadingSpinner/RectangularLoader";
import './ForgotPassword.css'

export const ForgotPasswordIndex = ({enable,passwordFunc,
    onLoad, loading}) => 
{
   useEffect(()=>{
    let timerId;
    if(loading){
        timerId = setTimeout(()=> onLoad(!loading), 2000);
        return ()=> clearTimeout(timerId)
    }
   },[loading])    
    
    return (  <>
    <div className={`loadingClass
             ${enable && loading ? 'true': ''}`}>
                <RectangularLoader/>
            </div>
                 <div className={`passwordClass
                  ${enable && !loading ? 'open' : ''}`}>
             <ForgotPasswordPage passwordFunc= {passwordFunc}/>
            </div> </>
    )
}