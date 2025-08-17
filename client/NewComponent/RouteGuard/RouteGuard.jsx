import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteLoadingPage } from "./RouteLoading";
import { authError } from "../Redux/Action/Action";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Load_User from "../Helper/loadUser";

export const ProtectedRoute = ({children}) => {
  const [delay, setDelay] = useState(false);
    // console.log('ROUTE PAGE IS TRIGGERED')
    const { isAuthenticated, loading, user} = useSelector(state => state.Auths);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // useEffect(() => {
    //   if(localStorage.token){
    //     Load_User(dispatch, navigate);
    //   } else {
    //     dispatch(authError());
    //   }
    // },[dispatch, navigate]);
     
    useEffect(() => {
      if (!loading && isAuthenticated) {
        const timer = setTimeout(() => {
          setDelay(true);
        }, 2000);

        return () => clearTimeout(timer);
      }
    },[loading, isAuthenticated]);

    if(!localStorage.token){
      return <Navigate to = "/" replace />
    }
  
    if (loading || (isAuthenticated &&  !delay)) return <RouteLoadingPage/>
     
    if (!isAuthenticated && !localStorage.token) {
      return <Navigate to = "/login" state = {{ from: location}} replace />
    }

      return children ;
    }
    
   


