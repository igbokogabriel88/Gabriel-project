import React, { useEffect, useState } from "react";
import './LoadingSpinner.css'

 const Loaders = ()=> {
    const [array, setArray] = useState([]);
    const [remainder, setRemainder] = useState(0)
    const [timer, setTimer] = useState(0);
    console.log('timer:', timer)
    console.log('remainder:', remainder)
    console.log('array:', array)
    const data = [
        {id: 1, color: 'blue'},
        {id: 2, color: 'green'},
        {id: 3, color: 'red'},
        {id: 4, color: 'purple'},
        {id: 5, color: 'orange'}
    ]
    let timerId;
   
    useEffect(()=>{
        timerId = setTimeout(()=>{
            setTimer((prev)=>{
                if(prev >= 150){
                    return 0
                } return prev + 1
            })
        },200);
        return ()=> clearTimeout(timerId)
    },[timer])
    useEffect(()=>{
      setRemainder(prev => timer % 5)
    },[timer])
    useEffect(()=> {
        setArray((prev)=>{
            if ( prev.length === 5 && remainder === 0){
                return [0]
            } 
            if (prev.includes(remainder)){
                return prev
            } return [...prev, remainder]
        })
    },[remainder])
    return(
        <div className="loadingContainer">
        {data.map(value =>{
         return <div key ={value.id} 
         style={{backgroundColor: array.includes(value.id - 1)? value.color: ''}}
         className ={`loadingSpan ${remainder ? 'yes': '2'}`}></div>
        })}
        </div>
    )
}
export default Loaders
