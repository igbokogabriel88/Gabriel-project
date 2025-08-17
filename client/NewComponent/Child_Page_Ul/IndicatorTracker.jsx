import React from "react";
import { useParams } from "react-router-dom";
import './ChildPage.css'

export const IndicatorTracker = ({value, selected}) =>{

  const mainCategory = 
  ['arts', 'gaming', 'photography', 'membership', 'pfps', 'exhibition'].includes(selected);

  const {item} = useParams();
  return (
    <div className={`indicator ${['privacy-policy','terms-of-service'].includes(selected) ? 'hide' : 
      mainCategory ? 'close' : ''
    } ${Number(selected) === Number(item) ? 'YES' : ''}`}
    style={{transform: `translateX(${value}px)`}}></div>
  )
}
