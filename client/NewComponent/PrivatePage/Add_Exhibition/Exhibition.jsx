import React, { useState } from "react";
import { Add_Exhibition } from "./Add_Exhibition";
import './Exhibition.css'

const Exhibitions = ()=> {
    const [add, setAdd] = useState(false);
    const handleAdd = ()=> {
        setAdd(!add)
    }
    return (<div className ={`add-exhibit`}> 
    <div className="imageClass">
        <span>Exhibition</span>
        <span className="span1Exhibit"> 
            <span className="span2Exhibit" onClick={handleAdd}>
                <span></span><span></span></span></span>
            <span>Add More</span>
        </div>
        <Add_Exhibition isAdd={add}/></div>)
} 
export default Exhibitions 
