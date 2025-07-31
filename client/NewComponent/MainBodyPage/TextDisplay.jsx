import { useEffect, useState } from "react"
import React from "react";
import './ImageShow.css'
export const TextDisplay = () =>{
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    const Data = ['Welcome to Gabriel web development company',
        'Here, you can learn everything about web design, development and application',
        'You will not regret joining us, you can be assured of acquiring the skills you need to exploit and rule your whole'
    ];
        useEffect(()=>{
            const typingSpeed = Math.random()* (300 - 100) + 100;
            const fullText = [currentIndex];
            let timerId;
            const handleTyping = () =>{
                if (!deleting){
                    if (displayText.length < fullText.length){
               timerId = setTimeout(()=> {
                setDisplayText(prev => fullText.substring(0, prev.length + 1));
               },400)
                    } else {
                timerId = setTimeout(()=>{
                    setDeleting(true)
                }, 2000)
                    }   
                }  else {
                    if (displayText > 0){
                        timerId = setTimeout(()=>{
                            setDisplayText(prev => fullText.substring(0, prev.length - 1))
                        }, 200)
                    } else{
                        setDeleting(false);
                        setCurrentIndex((prev) => (prev + 1)% Data.length)
                    }
                    
                }
                
            }
            return () => clearTimeout(timerId)
        }, [displayText, currentIndex, deleting]);
        return (
            <div className="display-container">
                <div>{displayText}</div>
                <p>{currentIndex}</p>
                <p>{deleting}</p>
                <span>Hello Gabriel</span>
            </div>
        )
    

}