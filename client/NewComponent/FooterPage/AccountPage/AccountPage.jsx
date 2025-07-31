
import React from "react";
import { AccountInitiation } from "../../DataCollection/data";
import { AccountArray } from "./AccountArray";
import './Account.css'

export const Account_Page = () =>{
return(
    <div className="accountClass">
         <span>{AccountInitiation.title}</span>
         <AccountArray itemValue={AccountInitiation.items}/>
    </div>
)
}