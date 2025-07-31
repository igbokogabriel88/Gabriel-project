import React from "react";
 import './Switch.css'
export const Edit_Switch = ({ id, toggle, onToggleSwitch,
 color, rounded, small
    // , convert

}) =>{
    return(
        <div className="controlz">
        <label className={`Switchz ${small ? 'small': ''}  ${rounded ? 'Yes': ''}`}>
            <input
            type= 'checkbox'
            id= {id}
            checked = {toggle}
            onChange={onToggleSwitch}
            className="Check"
            />
             <span className= 'Innerz' style={{"--dynamic-color": `${color?.value}`}}>
                <span className={`innerz before ${small ? 'small': ''}`}></span> 
                <span className={`innerz after ${small ? 'small': ''}`}></span>
                    
            </span>
            <span className={`switchz ${toggle ? 'yes' : ''} ${small ? 'small': ''}
             ${rounded ? 'Yes': ''} `}/> 
        </label>
        {/* <span>{small && toggle ? 'Married' : small && !toggle ?  'Single' : ''}</span> */}
        </div>
    )
}