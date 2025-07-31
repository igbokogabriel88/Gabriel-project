import { GET_CATEGORY, OPEN_SEARCH, SET_ERROR, REMOVE_ERROR,
SET_PHOTO, CLEAR_PHOTO} from "../Action/ActionType";
import { initialCategory } from "./InitialState";

const authInitialstate = {
    token : localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user : null
 };
 const initialError = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
 }
 const initialLoad = {
    loading: false
 };

const initialState = {name: ''};
const initialSearch = {searchOpen : false}
export const Category = (state= initialCategory, action)=>{ 
    const {type, payload} = action;
    switch(type){
        case 'GET_CATEGORY':
            // console.log('reducer is triggered:', payload)
        return {...state, name : payload
        };
        default : 
        return state
    }
}
export const search_Reducer = (state = initialSearch, action)=>{
    const {type, payload} = action;
    switch(type){
        case OPEN_SEARCH:
            // console.log('Search reducer is triggered:')
        return { ...state, searchOpen : !state.searchOpen
        };
        default : 
        return state
    }
}
 
export const error_Reducer = (state = initialError, action)=>{
    const {type, payload} = action;
    switch(type){
        case 'SET_ERROR': 
            // console.log('Error reducer is triggered:', payload) 
        return   { ...state,
                     username: payload.username,
                     email: payload.email,
                     password: payload.password,
                     confirmPassword: payload.confirmPassword
        };
        case 'REMOVE_ERROR':
            return {
                ...state,
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        default : 
        return state
    }
}

export const auth_Reducer = (state = authInitialstate, action) => {
    const {type, payload} = action;
    switch(type) {
        
        case 'USER_LOADED': {
            
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            
            }
        }; 
         case 'LOGIN_SUCCESS':
         localStorage.setItem('token', payload.token); 
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
        };

        case 'AUTH_ERROR':
        case 'LOGOUT':
        case 'LOGIN_FAIL' :
            localStorage.removeItem('token');
             return  {
             ...state,
             token: null,
             isAuthenticated: false,
             loading: false,
             user: null            
       };
        
        default : 
        return state
    }
}  



     export const profile_Reducer = (state = null, action)=>{
        const {type, payload} = action;
        switch(type){
            case 'SET_PHOTO': 
                // console.log('Error reducer is triggered:', payload) 
            return   payload;
            case 'CLEAR_PHOTO' : 
                return null;
            
            default : 
            return state
        }
    }
    