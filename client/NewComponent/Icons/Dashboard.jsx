import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent/Sidebar";
import { FaTimes } from "react-icons/fa";

export const Dashboard = ()=> {
    const [openModal, setOpenModal] = useState(false);
    // useEffect(()=>{
    //     if (sidebarOpen){
    //         sidebarFunc(!sidebarOpen)
    //     }
    // },[sidebarOpen]);

    const handleClickChange =()=> {
         setOpenModal(!openModal)
    }
    return (
        <>
        {!openModal ?
            <div className="dashboard-class"
            onClick={handleClickChange}><span/><span/><span/></div> :
        <div className="times-class"
        onClick={handleClickChange}><span className="timesClass">
            <span/><span/></span></div>}
           
            <SidebarComponent 
        open={openModal}
        sidebarClose={() => setOpenModal(!openModal)}
        />
        </>
    )
}