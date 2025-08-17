import React, { useEffect, useState } from "react";
import Image_Logo from "./Deposit";
import { FaExclamationTriangle, FaPaste, FaCheckCircle } from "react-icons/fa";
import './Deposit.css';

const DepositViewPage = ()=> {
    const [copyText, setCopyText] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const depositAddress = '0xcde02...'
    useEffect(()=> {
        if (copyText){
            setTimeout(()=> setCopyText(false), 3000)
        }
    },[copyText]);

    useEffect(()=>{
        if (isClick){
            setTimeout(()=> setIsClick(false), 200)
        }
    },[isClick])
    const handleCopyText =()=> {
        navigator.clipboard.writeText(depositAddress)
        setCopyText(true);
        setIsClick(true)
    };
    console.log('copyText:', copyText)
    return (
        <div className="depositClass"> 
        <div className="deposit-wrapper">
        <div className="deposit-title"> Deposit</div>
        <div className="deposit-form">
            <Image_Logo/>
            <div className="deposit-address"> 
                <small>
                    <FaExclamationTriangle/> 
                    Only send ETH to this address
                </small>
                <span>Deposit Address</span>
                <div className="deposit-input">
                    <input
                    defaultValue={depositAddress}/>
                    <span style={{backgroundColor: isClick? 
                        'skyblue' : ''
                    }}>
                        {!copyText ? <><FaPaste className="paste-logo"
                    onClick={handleCopyText}/>
                    <small>copy</small></> : 
                        <><FaCheckCircle className="paste-logo"/>
                        <small>Copied</small>
                        </>}
                    </span>

                </div>
            </div>
            <div className="deposit-network">
                <span>Network</span>
                <input
                defaultValue= "Ethereum (ERC20)"
                className="network-input"
                readOnly/>
            </div>
            <div className="network-summary">
                <div><span>Minimum deposit</span>
                <span>0.00000001 ETH</span></div>
                <div><span>Expected arrival</span>
                <span>12 network confirmation</span></div>
                <div><span>Expected unlock</span>
                <span>56 network confirmation</span></div>
            </div>
        </div>
            </div>
            </div>
    )
}
export default DepositViewPage