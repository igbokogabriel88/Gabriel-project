import React, {useEffect, useState, useRef} from 'react';

 const Transaction = ({userRef})=> {
    const transactionData = [{label: 'Type', value: 'type'},
        {label: 'Amount', value: 'amount'},
        {label: 'Date', value: 'date'},
        {label: 'Status', value: 'status'} ]
        const [position, setPosition]= useState(0);
         const scrollRefTax = useRef();
        //  console.log('transaction;',position)
         useEffect(()=>{
            const container = scrollRefTax.current;
            const handleScroll = () => {
                const maxScroll = container.scrollWidth - container.clientWidth;
                const scrollRatio = container.scrollLeft/ maxScroll;
                setPosition(scrollRatio * (container.clientWidth - 120))
            }
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll)
            };
         },[])
    
    return(
        <div className='transaction-main' ref={userRef}>
            <div className='transaction-title'>Transaction</div>
        <div className='transaction-wrapper' ref={scrollRefTax}>
            <div className='transaction-scroll'>
            <div className='transaction-row'> 
                {transactionData.map((data, i)=>(
                    <span key={i}>{data.label}</span>
                ))}
            </div>
            </div>
            
        </div>
        <span className='transaction-indicator' 
            style={{transform: `translateX(${position}px)`}}>
                </span>
        </div>
    )
}
 export default Transaction