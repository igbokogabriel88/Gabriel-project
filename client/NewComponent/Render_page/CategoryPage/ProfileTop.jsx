import React from "react";
import { useSelector } from "react-redux";
// import './Profile.css'

export const ProfileTop = ({user}) => {
    const PF = 'http://localhost:4200/images/'

    const convert = (value) => {
        if(value.length <=
             14){
            return value;
        } return value.slice(0, 11) + '...'
    }
    return (
        <>
        <div className="profile-tops">
            <img src= "/Upload/image_10.jpg"
             alt= "" className="profile-inputs"/>
        </div>
        <div className="small-pics">
            {user && !user?.userImage ? 
            <img src="/Upload/image10.jpg"/> : user && user?.userImage ? 
            <img src={PF + user?.userImage} className="small-wrappers"/> : ''}
            <span style={{marginTop: '12px', color: 'rgba(0,0,0,0.7', textDecoration: 'underline'}}>
                {convert(user?.username)}</span>
        </div>
        </>
    )
}