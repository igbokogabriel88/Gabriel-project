import React, {useEffect, useState, useRef} from 'react';
import { Sale_Transaction, Buy_Transaction } from './NFT_Data';
import { useLocation } from 'react-router-dom';
import './NFT_Transaction.css'

 const NFT_Transaction = ({userRef}) => {
     const [select, setSelect] = useState('bought')
     const [position, setPosition]= useState(0);
     const scrollNftRef = useRef();
     const location = useLocation();
    
     useEffect(()=>{
     const container = scrollNftRef.current;
     const handleScroll = () => {
     const maxScroll = container.scrollWidth - container.clientWidth;
     const scrollRatio = container.scrollLeft/ maxScroll;
     setPosition(scrollRatio * (container.clientWidth - 120))
     }
     container.addEventListener('scroll', handleScroll);
     return () => {
     container.removeEventListener('scroll', handleScroll)
     };
     },[]);
     const handleTransactionClick =(value)=>{
     setSelect(value)
         }
  
    return(
        <div className='nfts-transaction-main' ref={userRef}>
            <div className={`nfts-transaction ${select === 'sold'? 'yes': ''}`}>
                <span className='nfts-transaction-title'>Transaction</span>
              <div><span onClick={()=> handleTransactionClick('sold')}>
                Sold</span>
              <span onClick={()=> handleTransactionClick('bought')}>
                Bought</span></div> 
               </div>
        <div className='nfts-transaction-wrapper' ref={scrollNftRef}>
            <div className={`nfts-transaction-scroll ${select === 'bought'? 'yes': ''}`}>
            {select === 'sold' ? <Sale_Transaction/> :
            <Buy_Transaction selected={select}/>}
            </div>
            
        </div>
        <span className='nfts-transaction-indicator' 
            style={{transform: `translateX(${position}px)`}}>
                </span>
        </div>
    )
}
export default NFT_Transaction