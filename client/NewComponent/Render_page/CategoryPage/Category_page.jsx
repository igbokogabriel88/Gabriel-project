import React from "react";
import { FrontPageCategory } from "../Child_Page_Ul/Other_Category/FrontCatPage";
import { FooterPage } from "../FooterPage/FooterPage";

export const CategoryPageView = () => {
    return (
        <div className="category-page">
            <FrontPageCategory/>
            <FooterPage/>
        </div>
    )
}