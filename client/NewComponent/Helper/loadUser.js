import React from "react";
import axios from "axios";
import { USER_LOADED } from "../Redux/Action/ActionType";
 import { loadUser } from "../Redux/Action/Action"; 
//  import { NftsUser } from "./nftsuser";
import { setAuthtoken } from "./setAuthToken";
import { setAlert, authError} from "../Redux/Action/Action";

  const Load_User = async (dispatch, navigate) => {
     
     if(!localStorage.token){
      // console.log('LOCALSTORAGE',localStorage.token)
      return  dispatch(authError());
      // 
     }
    // console.log('Authorization header:', axios.defaults.headers.common['x-auth-token'])
    try{
      setAuthtoken(localStorage.token);

    const res = await axios.get('http://localhost:4200/api/auth/user');
    // console.log('AUTH_USER',res);
    // console.log('AUTH_USER',res.data?.User?.userName);

       dispatch(loadUser(res.data?.User));
       } catch (err) {
      // console.log(err)
      const error = err.response?.data.error;
      // dispatch(authError(err.response?.data.error));
      dispatch(authError());
      dispatch(setAlert(error, 'danger'))
    }
    }

 export default Load_User


 















