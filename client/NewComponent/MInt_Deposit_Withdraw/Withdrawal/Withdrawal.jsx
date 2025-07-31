import React, {useState, useEffect} from "react";
import { Internal_Withdrawal } from "./Internal";
import { On_Chain_Withdrawal } from "./On_Chain";
import './Withdrawal.css'

const Withdrawal = () => {
    const [selected, setSelected] = useState('on_chain');
    const [clickButton, setClickButton] = useState(null)
    useEffect(()=>{
      if(clickButton != null){
        setTimeout(() =>setClickButton(null), 200);
      }
    },[clickButton])
    
        const handleWithdrawalClick = (value) => {
            setSelected(value);
            setClickButton(value);
        };
        const handleChange = () => {

        };
        const handleSubmit = () => {

        }
        console.log('selcted:', selected)
    return (
        <div className="withdrawalClass">
            <div className="withdrawal-wrapper">
            <span className="withdrawal-title"> Withdrawal</span>
            <div className="withdrawal-form">
            <div className={`nfts-withdrawal ${selected === 'on_chain'? 'yes': ''}`}>
              <div> <span style={{backgroundColor: clickButton === 'on_chain'? 'skyblue': 
                selected === 'on-chain' ? 'white' : ''}}
               onClick={()=> handleWithdrawalClick('on_chain')}>
                On chain</span>
                <span style={{backgroundColor: clickButton === 'internal'? 'skyblue': 
                selected === 'internal' ? 'white' : ''}} 
              onClick={()=> handleWithdrawalClick('internal')}>
                Internal</span></div> 
               </div>
               {selected === 'on_chain' ? 
                <On_Chain_Withdrawal/> :
                 <Internal_Withdrawal/>}
                <div className="withdrawal-amount">
                <label htmlFor="withdrawal-amount">Withdrawal Amount</label>
                <input
                type="number"
                name="withdrawal_amount"
                id="withdrawal-amount"
                // value={}
                onChange={handleChange}
                className="style-exhibit"
                />
                <small>min 0.02 ETH</small>
                </div>
                <div className="mint-submit amount">
                    <span onClick={handleSubmit}>Withdraw</span>
                <small>Withdrawal might take up to 30 mins 
                    to be completely processed</small>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Withdrawal