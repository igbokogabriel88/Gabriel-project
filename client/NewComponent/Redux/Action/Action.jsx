
import { SET_ALERT, REMOVE_ALERT, GET_CATEGORY, OPEN_SEARCH, SET_ERROR, REMOVE_ERROR,
     USER_LOADED, AUTH_ERROR, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL,
    SET_PHOTO, CLEAR_PHOTO} from "./ActionType"

 export const setAlert = (msg, alertType) => dispatch =>{
    // const id = Math.floor((Math.random() * 20) + 1)
    console.log('ALERT ACTION IS TRIGGERED')
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
 export const openSearchBox = () => dispatch => {
    dispatch({
        type : OPEN_SEARCH
    })
 }

 export const set_Error = (data) => dispatch => {
    dispatch({
        type : SET_ERROR,
        payload : data
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

export const clearPhoto = () =>  dispatch => {

    dispatch({
        type: CLEAR_PHOTO
    })
};

