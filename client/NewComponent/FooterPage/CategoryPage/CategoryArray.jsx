import React from "react";
import './Category.css'

 export const CategoryArray = ({itemValue})=>{
    // console.log('items:', itemValue)
    return(
        <div key={itemValue.value} className="categoryArrayClass">
            {itemValue.map(item =>
                <span key={item.value} onClick={item.onClick}>{item.label}</span>
            )}
           </div>
    )
 }