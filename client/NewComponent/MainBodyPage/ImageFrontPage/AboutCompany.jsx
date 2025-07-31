import { useEffect, useState } from "react"
import React from "react";
import './ImageShow.css'
export const AboutCompany = () =>{
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    const ArrayString = ['Welcome to Gabriel web development company',
        'Here, you can learn everything about web design, development and application',
        'You will not regret joining us, you can be assured of acquiring the skills you need to exploit and rule your whole'
    ];
    
    const fullText = ArrayString[currentIndex];+
        useEffect(()=>{
                        let timerId;
            const typingSpeed = Math.random()* (300 - 100) + 100;
            
            const handleTyping = () =>{
                
                if (!deleting){
                    setDisplayText(prev => fullText.substring(0, prev.length + 1));
             } else {
                    setDisplayText(prev => fullText.substring(0, prev.length - 1));
                }
                 if (!deleting && displayText === fullText){
                    timerId = setTimeout(()=>{
                        setDeleting(true)
                    }, 2000)
                 } else if (deleting && displayText === ''){
                    timerId = setTimeout(() => {
                        setDeleting(false)
                    setCurrentIndex((prev) => (prev + 1) % ArrayString.length);
                    }, 1000);    
                 } else {
                     timerId =  setTimeout( handleTyping, typingSpeed)
                 }
            }
            timerId =  setTimeout(
                handleTyping, 200
             );
            return () => clearTimeout(timerId)
        }, [displayText, currentIndex, deleting]);
        return (
            <div className="display-container">
                <h3>{`${displayText}`}
                <span className="pipe"> |</span>
                </h3>
                
            </div>
        )
    

}