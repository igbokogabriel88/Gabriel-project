import React, {useRef, useEffect} from "react";
import { Category_Page } from "./CategoryPage/CategoryPage";
import { Account_Page } from "./AccountPage/AccountPage";
import { Company_Page } from "./CompanyPage/CompanyPage";
import { CopyrightPage } from "./CopyrightPage/CopyRight";
import { StayInTouch } from "./AccountPage/StayInTouchPage/StayInTouch";
import { removeError } from "../Redux/Action/Action";
import { useSelector, useDispatch } from "react-redux";
import './Footer.css'

export const FooterPage = () => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.Error);
    const wrapperRef = useRef(null);
    const displayRef = useRef(null);
    useEffect(()=> {
        const modalPage = (e)=>{
        if(errors && wrapperRef.current &&
        wrapperRef.current.contains(e.target) &&
            !displayRef.current.contains(e.target)){
            dispatch(removeError());
                }
            }
                
                document.addEventListener('mousedown', modalPage);
                return () => {document.removeEventListener('mousedown', modalPage)};
            }, [errors]);
        
    return (
        <div className="footerClass" ref={wrapperRef}> 
            <StayInTouch
            displayRef={displayRef}/>
            <Category_Page/>
            <Account_Page/>
            <Company_Page/>
            <CopyrightPage/>
        </div>
    )
}