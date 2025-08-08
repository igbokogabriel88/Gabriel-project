
import React from "react";
import { AccountArray } from "./AccountArray";
import { useNavigate } from "react-router-dom";
import './Account.css'

export const Account_Page = () =>{
    const navigate = useNavigate();

    const handleTransactionView = () => {
        navigate('/overview', {state: {focusTransactionPage: true}})
    };
    const handleMintNFTView = () => {
        navigate('/mint', {state: {focusMintingPage: true}})
    };
    const handleAccountView = () => {
        navigate('/overview', {state: {focusOverviewPage: true}})
    };
   const AccountInitiation = {
        title: 'Account',
        items: [{
                label: 'Account Overview', value: 'account-overview', onClick: handleAccountView},
                {label: 'Mint Nft', value: 'mint-nft', onClick: handleMintNFTView},
                {label: 'Transaction', value: 'transaction', onClick: handleTransactionView
        }]
    };
    
return(
    <div className="accountClass">
         <span>{AccountInitiation.title}</span>
         <AccountArray itemValue={AccountInitiation.items}/>
    </div>
)
}