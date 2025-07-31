import React from "react";
import {FaPaste} from 'react-icons/fa'
import './Withdrawal.css'

export const On_Chain_Withdrawal = ()=> {
    const handleChange = ()=> {

    }
    return (
        <div className="chainClass">
       <span>What is on chain transaction ?
        </span>
        <span>On chain transaction is the type of transaction that makes use of the block chain to transfer 
        coin from one wallet to the other, laern more 
        </span>
        <div className="withdrawal-address">
                <label htmlFor="withdrawal-address">Withdrawal Address</label>
                <div className="withdrawal-input">
                <input
                type="text"
                name="withdrawal-address"
                id="withdrawal-address"
                // value={}
                onChange={handleChange}
                className="style-exhibit"
                />
                <span>Paste <FaPaste/></span></div>

                <div className="withdrawal-network">
                <label htmlFor="withdrawal-network">
                    Network</label>
                <div className="network-input">
                <input
                
                className="style-exhibit"
                />
                <span>WETH</span></div>
                </div>
                </div>
    </div>
    )
}