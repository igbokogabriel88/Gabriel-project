import React from "react";
import { Logout } from "../../Redux/Action/Action";
import { useDispatch } from "react-redux";
import { FaSignOutAlt,FaExchangeAlt,FaUserCircle,
     FaTachometerAlt, FaUserCog, FaEdit, FaThLarge, FaKey,
      FaPencilAlt, FaMoneyCheckAlt }from "react-icons/fa";

      const dispatch = useDispatch();

   const handleSignOut = () => {
    console.log('HANDLE LOGOUT CLICK')
        dispatch(Logout())
 };
   const handleAccountView = () => {

   };
   const handleChangePassword = () => {

   };
   const handleEditProfile = () => {

   };
   const handleMarketPlace = () => {

   };
    const handleNftProfile = () => {

    };
    const handleNftTransaction = () => {

    };
    const handleTransaction = () => {

    };
    const handleMint = () => {

    };

export const SidebarData = [
    {label: 'Acount Overview', icon: FaTachometerAlt , onClick: handleAccountView},
    {label: 'Mint NFT', icon: FaEdit , onClick: handleMint},
    {label: 'MY NFT profile', icon: FaUserCircle , onClick: handleNftProfile},
    {label: 'Transaction', icon: FaExchangeAlt , onClick:  handleTransaction},
    {label: 'Market-place', icon: FaThLarge , onClick: handleMarketPlace},
    {label: 'NFT transaction', icon: FaMoneyCheckAlt , onClick: handleNftTransaction},
    {label: 'Edit Profile', icon: FaPencilAlt , onClick: handleEditProfile},
    {label: 'Change Password', icon: FaKey , onClick: handleChangePassword},
    {label: 'Sign Out', icon: FaSignOutAlt ,onClick: handleSignOut}
]