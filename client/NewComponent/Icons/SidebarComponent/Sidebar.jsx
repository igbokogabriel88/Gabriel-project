import React from "react";
import { Logout } from "../../Redux/Action/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt,FaExchangeAlt,FaUserCircle,
     FaTachometerAlt, FaUserCog, FaEdit, FaThLarge, FaKey,
    FaPencilAlt, FaMoneyCheckAlt }from "react-icons/fa";
// import { SidebarData } from "./SidebarInitial";
import './Sidebar.css'

const SidebarComponent = ({open, sidebarClose})=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.loading)
  const user = useSelector(state => state.Auths.user)

   const handleSignOut = () => {
    console.log('HANDLE LOGOUT CLICK');
        sidebarClose();
        dispatch(Logout());
        navigate('/')
      
 };
   const handleAccountView = () => {
          sidebarClose();
          navigate('/overview', {state: {focusOverviewPage: true}})
   };
   const handleChangePassword = () => {
          sidebarClose();
          navigate('/change-password')
   };
   const handleEditProfile = () => {
          sidebarClose()
          navigate('/edit-profile')
   };
   const handleMarketPlace = () => {
        sidebarClose()
        navigate('/')

   };
    const handleProfile = () => {
      sidebarClose()
      navigate('/profile')
    };
    const handleNftTransaction = () => {
      sidebarClose();
      navigate('/overview', {state: {focusNftTransactionPage: true}})
    };
    const handleTransaction = () => {
      sidebarClose();
      navigate('/overview', {state: {focusTransactionPage: true}})
    };
    const handleMint = () => {
      sidebarClose();
      navigate('/mint')
    };

   const SidebarData = [
    {label: 'Acount Overview', icon: FaTachometerAlt , onClick: handleAccountView},
    {label: 'Mint NFT', icon: FaEdit , onClick: handleMint},
    {label: 'MY NFT profile', icon: FaUserCircle , onClick: handleProfile},
    {label: 'Transaction', icon: FaExchangeAlt , onClick:  handleTransaction},
    {label: 'Market-place', icon: FaThLarge , onClick: handleMarketPlace},
    {label: 'NFT transaction', icon: FaMoneyCheckAlt , onClick: handleNftTransaction},
    {label: 'Edit Profile', icon: FaPencilAlt , onClick: handleEditProfile},
    {label: 'Change Password', icon: FaKey , onClick: handleChangePassword},
    {label: 'Sign Out', icon: FaSignOutAlt ,onClick: handleSignOut}
]
   return (
    <div className={`sidebarClass ${open ? 'open': ''}`}>
        <div className="sidebar-header">
            <span>Icon</span><span>Mintxplore</span>
        </div>
        <div className="sidebar-wrapper">
     {SidebarData.map((data, i)=>
     {
        const Icon = data.icon;
      return (
        <div key={i} onClick={data.onClick}>
            <span><Icon className="sidebar-icon"/>
            </span><span>{data.label} </span></div>
     )})} </div>
    </div>
   )
}

export default SidebarComponent