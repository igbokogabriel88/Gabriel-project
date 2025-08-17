import React from "react";
import { CategoryHeading } from "./IndexHead";

export const  CategoryItem = ({item}) => {
     return(
        <div className={`catItem ${item ? 'show': ''}`}>
            <CategoryHeading/>
        </div>
     )
}