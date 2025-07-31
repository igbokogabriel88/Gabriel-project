import React, {useState, useEffect} from "react";
import { ForgotPasswordIndex } from "./Index";
import RectangularLoader from "../../LoadingSpinner/RectangularLoader";
import './ForgotPassword.css'

const ForgotPasswordView = ({enable, onLoad, passwordFunc, loading})=> {
    useEffect(()=> {
        let timerId;
        if(loading){
           timerId = setTimeout(()=> onLoad(!loading), 2000);
           return () => clearTimeout(timerId)
        }
    }, [loading]);
    console.log('loadingz:', loading)
    return (
         <div className={`password-view-class 
            ${enable ? 'true': ''}`}>
        <div className={`loadingClass
             ${enable && loading ? 'true': ''}`}>
                <RectangularLoader/>
            </div> 
           <ForgotPasswordIndex
            enable={enable}
            loading={loading}
            passwordFunc={passwordFunc}/> 
        </div>
    )
}

export default ForgotPasswordView