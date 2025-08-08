import React from "react";
import './ChildPage.css'

export const IndicatorTracker = ({value, selected}) =>{

  const mainCategory = 
  ['arts', 'gaming', 'photography', 'membership', 'pfps', 'exhibition'].includes(selected)
  return (
    <div className={`indicator ${['privacy-policy','terms-of-service'].includes(selected) ? 'hide' : 
      mainCategory ? 'close' : ''
    }`}
    style={{transform: `translateX(${value}px)`}}></div>
  )
}
