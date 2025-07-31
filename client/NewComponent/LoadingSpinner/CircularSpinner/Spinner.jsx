import React from "react";
import './Spinner.css'

export const Spinner = ()=> {
    const dotArray = [...Array(6)];
    const speed = 1
    const angleStep = 360/dotArray.length;
    console.log('angle:', angleStep);
    console.log('dotArray:', dotArray.length);

    return (
        <div className="main-spinner">
            {dotArray.map((_, i)=>(
                <div key={i}
                className="dot-wrapper"
                style={{transform: `rotate(${i * angleStep}deg)`}}>
                <span
                className="dots"
                 style={{backgroundColor: 'blue', animationDelay: `${(i * speed)/dotArray.length}s`}}
                ></span>
                </div>
            ))}
        </div>
    )
}