
import { SET_ALERT, REMOVE_ALERT, GET_CATEGORY, OPEN_SEARCH, SET_ERROR, REMOVE_ERROR,
     USER_LOADED, AUTH_ERROR, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL,
    SET_PHOTO, CLEAR_PHOTO, SET_FIELD_ERROR, SET_REGISTER,CLOSE_SEARCH,
CLEAR_REGISTER, SET_LOADING, CLEAR_LOADING, GET_TOKEN, CLEAR_TOKEN,
SET_LOGIN_LOADING, CLEAR_LOGIN_LOADING, FETCH_DATA, CURRENT_PAGE,
 SET_INDEX, CLEAR_INDEX, SET_WALLET_ADDRESS, CLEAR_WALLET_ADDRESS} 
 from "./ActionType"

 export const setAlert = (msg, alertType) => dispatch =>{
    // const id = Math.floor((Math.random() * 20) + 1)
    // console.log('ALERT ACTION IS TRIGGERED')
    dispatch({
        type : SET_ALERT,
        payload : { msg, alertType}
    });

    

    setTimeout(()=>{
        dispatch({
            type : 'REMOVE_ALERT'
        })
    }, 2500
);
 }
 
 export const getCategory = (value) => dispatch =>{
    dispatch({
        type : GET_CATEGORY,
        payload :  value
    })
 }
 export const openSearchBox = (value) => dispatch => {
    dispatch({
        type : OPEN_SEARCH,
        payload: value
    })
 };

 export const closeSearchBox = (value) => dispatch => {
    dispatch({
        type : OPEN_SEARCH,
        payload: value
    })
 }


 export const set_Error = (errors) => dispatch => {
    dispatch({
        type : SET_ERROR,
        payload : errors})
 };

 export const set_Field_Error = (field, message) => dispatch => {
    dispatch({
        type: SET_FIELD_ERROR,
        payload: { field, message}
    })
 }

 export const removeError = () => dispatch => {
    dispatch({
            type : REMOVE_ERROR,
            
    })
 }

 export const authError = () => dispatch => {
    // console.log('RemoveDispatch is triggered')
    dispatch({
            type : AUTH_ERROR,
            
    })
 }
 

 export const Logout = () =>async dispatch => {
    dispatch({
      type : LOGOUT
  })
   }
 
   export const loadUser = (data) => dispatch => {
    dispatch({
      type : 'USER_LOADED',
      payload: data
  })
   }
    
export const loginSuccess = (data) => async dispatch =>{
      
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data
    })
} 
export const loginFail = () => async dispatch => {
     dispatch({
        type: LOGIN_FAIL
     })
}
export const setPhoto = (value) =>  dispatch => {

    dispatch({
        type: SET_PHOTO,
        payload: value
    })
}


export const setRegister = (value) =>  dispatch => {

    dispatch({
        type: SET_REGISTER,
        payload: value
    })
}

export const clearPhoto = () =>  dispatch => {

    dispatch({
        type: CLEAR_PHOTO
    })
};


export const clearRegister = () =>  dispatch => {

    dispatch({
        type: CLEAR_REGISTER
    })
};

export const setLoading = (data) => async dispatch =>{
      
    dispatch({
        type: SET_LOADING,
        payload: data
    })
}

export const clearLoading = (data) => async dispatch =>{
      
    dispatch({
        type: CLEAR_LOADING,
        payload: data
    })
}

export const getToken = (value) =>  dispatch => {

    dispatch({
        type: GET_TOKEN,
        payload: value
    })
}

export const clearToken = () =>  dispatch => {

    dispatch({
        type: CLEAR_TOKEN
    })
};

// export const getPolicyTerm = (value) => dispatch =>{
//     dispatch({
//         type : SELECT_TERM,
//         payload :  value
//     })
//  }

export const setLoginLoading = (data) => async dispatch =>{
      
    dispatch({
        type: SET_LOGIN_LOADING,
        payload: data
    })
}

export const clearLoginLoading = (data) => async dispatch =>{
      
    dispatch({
        type: CLEAR_LOGIN_LOADING,
        payload: data
    })
}
export const fetchData = (data) => async dispatch =>{
      
    dispatch({
        type: FETCH_DATA,
        payload: data
    })
}

export const SetCurrentPage = (page) => async dispatch =>{
      
    dispatch({
        type: CURRENT_PAGE,
        payload: page
    })
}

export const setIndex = (number) => async dispatch =>{
      
    dispatch({
        type: SET_INDEX,
        payload: number
    })
}

export const clearIndex = () => async dispatch =>{
    dispatch({
        type: CLEAR_INDEX

    })
}
export const setWalletAddress = (value) => async dispatch =>{
    dispatch({
        type: SET_WALLET_ADDRESS,
        payload: value
    })
}

export const clearWalletAddress = () => async dispatch =>{
    dispatch({
        type: CLEAR_WALLET_ADDRESS,
    })
}