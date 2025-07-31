import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountPage } from "./AccountPage";
import NFT_Page from "./NFT_Page";
import Exhibition from "./Exhibition";
import NFT_Transaction from "./NFT_Transaction/NFT_Transaction";
import Exhibitions from "./Add_Exhibition/Exhibition";
import Transaction from "./Transaction";
import { useSelector } from "react-redux";
import { RouteLoadingPage } from "../RouteGuard/RouteLoading";
import './Overview.css'

export const Account_Overview = () => {
        const [addExhibit, setAddExhibit] = useState(false);
        const navigate = useNavigate();
        const {user , loading} = useSelector(state => state.Auths);

        if (loading || !user) {
          return <RouteLoadingPage/>
        }

        const handleExhibition = (value)=>{
          setAddExhibit(value)
        };
        const handleMintClick= ()=> {
          navigate('/mint')
        };
        const handleDepositClick = () => {
          navigate('/deposit')
        };

        const handleWithdrawalClick = () => {
          navigate('/withdrawal')
        }

        console.log('handleExhibit:', addExhibit)
  return (
    <div>
        <h2> Account Overview</h2>
        
        <AccountPage/>
        <div className="buttonClass">
          <span onClick={handleDepositClick}>Deposit</span>
          <span onClick={handleMintClick}>Mint</span>
          <span onClick= {handleWithdrawalClick}>Withdrawal</span>
        </div>
        <NFT_Page/>
        <Transaction/>
         <Exhibition/> 
         <NFT_Transaction/>
         {/* <Exhibitions exist = {addExhibit}/> */}
    </div>
  )
}