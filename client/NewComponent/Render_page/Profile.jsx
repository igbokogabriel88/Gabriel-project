import React from "react";
import { ProfileTop } from "./CategoryPage/ProfileTop";
import { CategoryBody } from "./CategoryBody";
import { FooterPage } from "../FooterPage/FooterPage";
import { useSelector } from "react-redux";
import './Profile.css'

export const Profile = () => {

    const user = useSelector(state => state.Auths.user);
    console.log('PROFILE_USER:', user);
   return (
    <div className="profile-wrappers">
        <ProfileTop user={user}/>
        <CategoryBody user={user}/>
        <FooterPage/>
    </div>
   )
}