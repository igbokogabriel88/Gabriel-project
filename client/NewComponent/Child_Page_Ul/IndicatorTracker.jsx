import React from "react";
import './ChildPage.css'

export const IndicatorTracker = ({value}) =>{
  return (
    <div className="indicator" style={{transform: `translateX(${value}px)`}}></div>
  )
}
