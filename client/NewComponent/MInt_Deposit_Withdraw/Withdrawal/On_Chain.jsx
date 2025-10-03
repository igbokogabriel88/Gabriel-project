import React from "react";
import { errorFieldWithdrawal, errorWithdrawalFunc } from "../../HelperNft";
import { useDispatch, useSelector } from "react-redux";
import {FaPaste} from 'react-icons/fa'
import './Withdrawal.css'
import { useState } from "react";

export const On_Chain_Withdrawal = ({onAddress})=> {
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const withdrawalError = useSelector(state => state.withdrawalError);


    const handleChange = async (e) => {
        const { name, value} = e.target;
          setAddress(value);
          onAddress(value);
          await errorFieldWithdrawal(name, value, dispatch);
    }

    return (
        <div className="chainClass">
       <span>What is on chain transaction ?
        </span>
        <span>On chain transaction is the type of transaction that makes use of the block chain to transfer 
        coin from one wallet to the other, learn more 
        </span>
        <div className="withdrawal-address">
                <label htmlFor="withdrawal-address">Withdrawal Address</label>
                <div className="withdrawal-input">
                <input
                type="text"
                name="withdrawalAddress"
                id="withdrawal-address"
                value={address}
                onChange={handleChange}
                className="style-exhibit"
                />
                <span>Paste <FaPaste/></span></div>
                {withdrawalError?.address && 
        <span style={{color: 'red', marginTop: '2px', marginLeft: '0px', position: 'relative'}}>{withdrawalError.address}</span>}
        

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