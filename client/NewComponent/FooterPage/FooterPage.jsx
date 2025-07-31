import React from "react";
import { Category_Page } from "./CategoryPage/CategoryPage";
import { Account_Page } from "./AccountPage/AccountPage";
import { Company_Page } from "./CompanyPage/CompanyPage";
import { CopyrightPage } from "./CopyrightPage/CopyRight";
import { StayInTouch } from "./AccountPage/StayInTouchPage/StayInTouch";
import './Footer.css'

export const FooterPage = () => {
    return (
        <div className="footerClass"> 
            <StayInTouch/>
            <Category_Page/>
            <Account_Page/>
            <Company_Page/>
            <CopyrightPage/>
        </div>
    )
}