import React, { useEffect } from "react";
import Loaders from "../LoadingSpinner/Loader";
 import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import './Route.css'

export const RouteLoadingPage = () => {
    const auth = useSelector(state => state.Auths);
    console.log(auth)
//       const dispatch = useDispatch();
//    const navigate = useNavigate();
//    auth = useSelector(state => state.Auths);

   
//    useEffect(() => {
//        if(auth.isAuthenticated && !auth.loading){
//         const timer = setTimeout(() => {
//             navigate('/overview');
//         }, 2000);

//         return clearTimeout(timer);

//        }
        
//    },[auth.loading, auth.isAuthenticated]);

    return (
        
        <div className="loadingRoute">
            {/* 5Please wait ... */}
          <Loaders/> 
        </div>
    
    )
}