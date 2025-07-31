import React, { useEffect, useState } from "react";
import './LoadingSpinner.css'

const RectangularLoader = ()=> {
    
    return (
        <div className="main-wrapper">
            {[...Array(6)].map((_, i) =>(
                <div key={i} className="wrapper"
                style={{animationDelay: `${(i/6)}s`}}>
                </div>
            )) }
        </div>
    )
}
export default RectangularLoader