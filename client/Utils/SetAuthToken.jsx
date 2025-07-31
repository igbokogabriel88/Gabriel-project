import React from "react";
import axios from "axios";
export const setAuthtoken = (token) => {
    console.log(token)
    if(token){
        axios.defaults.headers.common['x-auth-token'] = `${token}`
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}