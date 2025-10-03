import React, {useState, useEffect} from "react";
import { Internal_Withdrawal } from "./Internal";
import { On_Chain_Withdrawal } from "./On_Chain";
import { clearWithdrawalError, setWithdrawalError } from "../../Redux/Action/Action";
import { errorFieldWithdrawal, errorWithdrawalFunc } from "../../HelperNft";
import { useDispatch, useSelector } from "react-redux";
import './Withdrawal.css'

const Withdrawal = () => {
    const [selected, setSelected] = useState('on_chain');
    const [address, setAddress] = useState('');
    const [network, setNetwork] = useState('');
    const [amount, setAmount] = useState(null);
    const [type, setType] = useState('');
    const [email, setEmail] = useState('')
    const [clickButton, setClickButton] = useState(null);

    const dispatch = useDispatch();
    const withdrawalError = useSelector(state => state.withdrawalError);

    useEffect(()=>{
      if(clickButton != null){
        setTimeout(() =>setClickButton(null), 200);
      }
    },[clickButton]);
    
        const handleWithdrawalClick = (value) => {
            setSelected(value);
            setClickButton(value);
            dispatch(clearWithdrawalError());
        };

        const handleSelect = (value) => {
              setType(value)
        };
       const handleAddress = (value) => {
          if (type === 'address') {
            setAddress(value)
          } else {
            setEmail(value)
          }
       };
        const handleNetwork = (value) => {
          setNetwork(value)
        };
        const handleChange = async (e) => {
             const {name, value} = e.target;
             setAmount(value);
             await errorFieldWithdrawal(name, value, dispatch);
        };

        const onHandleAddress = (value) => {
          setAddress(value)
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('ADDRESS & AMOUNT:', address, amount)
            e.preventDefault();
                   
            dispatch(clearWithdrawalError());
            const error = {};
            // const minting = false;
            // console.log('MINTING:',minting);
            await errorWithdrawalFunc(address, amount, error);
            console.log('WITHDRAWAL_ERRORS:', error)
                   
            const hasErrors = Object.values(error).some(err => err !== '' && err !== null);
            if (hasErrors) {
            console.log('BLOCKING SUBMIT DUE TO ERRORS')
            dispatch(setWithdrawalError(error))
            return;
            }
                   
          dispatch(clearWithdrawalError())
          console.log('MINT_SUCCESS:');
        }
        console.log('selected:', selected);

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
                <On_Chain_Withdrawal
                onAddress={onHandleAddress}
                /> :
                 <Internal_Withdrawal
                 onSelect={handleSelect}
                 onNetwork={handleNetwork}
                 onAddress={handleAddress}
                 />}
                <div className="withdrawal-amount">
                <label htmlFor="withdrawal-amount">Withdrawal Amount</label>
                <input
                type="number"
                name="withdrawalAmount"
                id="withdrawal-amount"
                value={amount}
                onChange={handleChange}
                className="style-exhibit"
                />
                {withdrawalError?.amount && 
        <span style={{color: 'red', marginTop: '2px', marginLeft: '0px', position: 'relative'}}>{withdrawalError.amount}</span>}
        
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