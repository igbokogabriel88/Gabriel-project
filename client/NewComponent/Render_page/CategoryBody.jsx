import React from "react";
import { Private_Owner } from "./CategoryPage/Nft_profile";
import { Private_Exhibition } from "./CategoryPage/Exhibition";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export const CategoryBody = ({user}) => {
    return (
        <>
        <div className="cat-bodys">
            <div><span className="bold">Bio</span><span>{user?.bio}</span></div>
            <div><span><FaFacebook/></span><span>{user?.facebook}</span></div>
            <div><span><FaInstagram/></span><span>{user?.instagram}</span></div>
            <div><span><FaYoutube/></span><span>{user?.youTube}</span></div>
            </div> <Private_Owner/>
            <Private_Exhibition/> </>
    )
}