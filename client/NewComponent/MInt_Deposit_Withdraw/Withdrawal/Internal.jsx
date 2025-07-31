import React, {useEffect, useState} from "react";
import { FaPaste, FaEnvelope, FaChevronDown } from "react-icons/fa";

export const Internal_Withdrawal = ()=> {
    const [select, setSelect] = useState('address');
    const [userAddress, setUserAddress]= useState('');
    const [network, setNetwork] = useState('weth');
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonClick, setButtonClick] = useState(null)
    const networkData = ['weth', 'eth'];
    useEffect(()=>{
      if(buttonClick != null){
        setTimeout(() =>setButtonClick(null), 200)
      }
    },[buttonClick])
    const handleInternalClick = (value)=> {
      setUserAddress('');
        setSelect(value);
        setButtonClick(value);
    };
    const handleChange = (event)=> {
      const {value} = event.target;
      setUserAddress(value)
    };
    const convert =(value)=> {
      return value.toUpperCase();
    };
    const handleClick =()=> {
      setModalOpen(!modalOpen)
    };
    const onHandleClick =(value)=> {
      setNetwork(value);
      setModalOpen(!modalOpen);
    };
    
    // console.log('value:', userAddress);
    console.log('network:', network);
    console.log('buttonClick:', buttonClick);
    return (
        <div className="internalClass">
            <div>
       <span>What is internal transaction ?
        </span> 
        <span>Internal is the transaction between users withing 
        the app, it would not be processed through the block chain and 
        requires no gas fee
        </span> </div>
        <div className={`internal-withdrawal ${select === 'address'? 'yes': ''}
        `}>
              <span style={{backgroundColor: buttonClick === 'address'? 'skyblue': 
                select === 'address' ? 'white' : ''}}
              onClick={()=> handleInternalClick('address')}>
                Address</span>
              <span style={{backgroundColor: buttonClick === 'email'? 'skyblue': 
                select === 'email'? 'white' : '' }}
              onClick={()=> handleInternalClick('email')}>
                Email</span> 
               </div>
        {/* <div className= 'internal-wrapper'> */}
              {/* <div className={`internal-withdrawals ${select === 'address'? 'yes': ''}`}>
                <span onClick={()=> handleInternalClick('address')}>
                Email</span> 
              <span onClick={()=> handleInternalClick('email')}>
                Email</span></div>  */}
                {select === 'address' ? 
                <div className="internal-class">
                  <label htmlFor="withdrawal-address">User deposit Address</label>
                <div className="internal-input">
                <input
                type="text"
                id="withdrawal-address"
                 value={userAddress}
                onChange={(e)=>setUserAddress(e.target.value)}
                className="style-exhibit"
                />
                <span>Paste <FaPaste/></span></div>
                </div> :
                <div className="internal-class">
                  <label htmlFor="email">Email Address</label>
                <div className="internal-input yes">
                <input
                type="email"
                id="email"
                value={userAddress}
                onChange={(e)=>setUserAddress(e.target.value)}
                className="style-exhibit"
                />
                <span><FaEnvelope/></span></div></div>}
                <div className="internal-networks">
                <label htmlFor="internal-network">
                    Network</label>
                <div className="network-inputs">
                <input
                id="internal-network"
                value={convert(network)}
                
                className="style-exhibit"
                />
                <span><FaChevronDown onClick={handleClick}/></span></div>
                </div>
               {/* </div> */}
               {modalOpen && <div className="mini-modal">
                {networkData.map((data,i)=>(
                  <span key={i}>
                  <label htmlFor={data}>{convert(data)}</label>
                  <input
                  type='radio'
                  id={data}
                  value={data}
                  checked = {network === data}
                  onChange={() => onHandleClick(data)}
                  className='check'
                  />
                </span>
                  
                ))}
                </div>}
    </div>
    )
}