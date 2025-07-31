import React from "react";
import './Company.css'

 export const CompanyArray = ({itemValue})=>{
    return(
        <div key={itemValue.value} className="companyArrayClass">
            {itemValue.map(item =>
                <span key={item.value}>{item.label}</span>
            )}
           </div>
    )
 }
