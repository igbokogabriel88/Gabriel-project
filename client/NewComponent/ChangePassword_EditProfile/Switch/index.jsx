import React from "react";
 import { Edit_Switch } from "./Switch";
 import './Switch.css'
 
const Edit_Profile_view = ({showLabel = false, toggle,
     handleToggleSwitch}) =>{
    const colorData = {label: 'Green', value: 'green' }
     
    return(
           
        <div className = 'switch-wrapper'>
            {/* <span className="married-singlez">
                {showLabel ? 'Marital status' : ''}</span>  */}
            <Edit_Switch
            color={colorData}
             id= 'married-single'
            toggle= {toggle}
             rounded= {false}
             small= {true}
            onToggleSwitch= {handleToggleSwitch}
            />
    </div>
    // </div>
     )
    }
    export default Edit_Profile_view
    