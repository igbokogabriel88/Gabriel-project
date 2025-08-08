import React, {useRef, useEffect} from "react";
import { CompanyPolicy } from "./CompanyPolicy";
import { TermsOfServicePage } from "./TermsOfServe";
import { useNavigate } from "react-router-dom";
import './termPolicy.css'
import { replace, useLocation } from "react-router-dom";

export const TermAndPolicy = ({data}) => {
    const location = useLocation();
    const navigate = useNavigate();
    // const termAndPolicyRef = useRef(null);

    // useEffect(()=> {
    //     let didScroll = false;

    //     if (location.state?.focusTermAndPolicyPage){
    //         termAndPolicyRef.current?.scrollIntoView({behavior: 'smooth'});
    //         didScroll = true;
    //         if(didScroll){
    //             navigate(location.pathname, {replace: true, state: {}});
    //         }
    //     }
    // },[location, navigate]);
    
    return (
        <div className="policy-wrapper" 
        //  ref= {termAndPolicyRef}
         >
        <TermsOfServicePage item= {data}/>
        <CompanyPolicy item={data}/>
        Terms of service and privacy policy
        </div>
    )
}