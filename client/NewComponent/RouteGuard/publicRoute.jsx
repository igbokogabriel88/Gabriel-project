import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Router } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { RouteLoadingPage } from "./RouteLoading";

export const PublicOnlyRoute = ({children}) => {
    const {isAuthenticated, loading} = useSelector(state => state.Auths);

    if (loading) return <RouteLoadingPage/>

    if (isAuthenticated) {
        return <Navigate to = "/overview" replace/>

        return children
    }

}