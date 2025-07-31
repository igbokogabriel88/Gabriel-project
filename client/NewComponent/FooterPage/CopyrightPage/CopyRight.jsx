import React from "react";
import {FaRegCopyright} from 'react-icons/fa'
 import './Copyright.css'

export const CopyrightPage = () => {
    return(<span className="copyrightClass"><p><FaRegCopyright/></p>
     <p>Copyright 2024 mintxplore. All rights reserved</p>
    </span>)
}