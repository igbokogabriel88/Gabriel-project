import React from "react";
import axios from "axios";
export const setAuthtoken = (token) => {
    //   console.log('i am token')
    //   console.log(axios.defaults.headers.common)
    if(token){
        console.log('AUTH_TOKEN:', token)
    axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}