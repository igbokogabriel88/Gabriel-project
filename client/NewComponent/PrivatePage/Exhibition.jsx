import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Exhibition = ()=> {
    const navigate = useNavigate();
    const handleClick = ()=> {
           navigate('./exhibitions')
    };
    
    return(
        <div className="exhibit-wrapper">
            <div className="exhibit-wrapper-inner">
                <div className="exhibit-wrapper-row"><span>Exhibition</span>
                <span onClick={handleClick}>Add More</span></div>
                <div className="exhibits">
                    <p> No Exhibition available</p>
                </div>
            </div>
        </div>
    )
}
export default Exhibition