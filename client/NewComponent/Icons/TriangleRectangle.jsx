import React from "react";
import './Icons.css'
export const Triangle_Rectangle = ({showBar, position}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2px',
         backgroundColor: 'white', width: '20px', alignItems: 'center', marginLeft: '1px'
         , paddingTop: '3px', paddingBottom: '3px',transform: `translateY(${position * 1.82}px)` }} 
         className={`Angles ${showBar ? 'show' : 'unShow'}`}>
        <div className="angleOne
        "></div>
        <div className="angleTwo
        "></div>
        <div className="angleThree
        "></div>
        <div className="angleOne rotate
        "></div>
        </div>
    )
}
