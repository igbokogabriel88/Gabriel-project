

import React, {useEffect, useState} from "react";
import RegisterPage from "./RegisterPage";
import './Register.css'

export const Modal_Register = ({onhandleSwitch, openModal})=>{
    // const [isReady, setIsReady] = useState(false);
    // useEffect(()=> {
    //     const timer = setTimeout(()=>
    //         setIsReady(true), 10);
    //     return ()=> clearTimeout(timer)
    // },[])
    return(
        <>
        <div className={`modalReg ${ openModal ? 'yes' : 'no'}`}>
        <RegisterPage handleSignIn={onhandleSwitch} handleClick={onhandleSwitch}
        openModal={openModal}/> 
        </div>
        </>
    )
}