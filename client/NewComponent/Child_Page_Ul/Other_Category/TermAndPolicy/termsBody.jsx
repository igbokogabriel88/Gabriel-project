
 import React, {useRef, useEffect} from "react";
 import { CompanyPolicy } from "./CompanyPolicy";
 import { TermsOfServicePage } from "./TermsOfServe";
 import './termPolicy.css'
 
    export const TermPolicyBody = ({data}) => {
    return(
        <div className="policy-wrapper">
        <TermsOfServicePage item={data}/>
        <CompanyPolicy item={data}/>
        
        </div>
    )
 }