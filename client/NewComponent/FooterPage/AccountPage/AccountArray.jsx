import React from "react";
import './Account.css'

 export const AccountArray = ({itemValue})=>{
    return(
        <div key={itemValue.value} className="accountArrayClass">
            {itemValue.map(item =>
                <span key={item.value}>{item.label}</span>
            )}
           </div>
    )
 }