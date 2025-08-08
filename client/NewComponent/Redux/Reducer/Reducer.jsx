import { GET_CATEGORY, OPEN_SEARCH, SET_ERROR, REMOVE_ERROR,
SET_PHOTO, CLEAR_PHOTO, SET_FIELD_ERROR, SET_REGISTER, CLEAR_REGISTER,
CLOSE_SEARCH, SET_LOADING, CLEAR_LOADING, GET_TOKEN, CLEAR_TOKEN, FETCH_DATA,
SET_LOGIN_LOADING, CLEAR_LOGIN_LOADING} 
from "../Action/ActionType";
import { initialCategory} from "./InitialState";

const authInitialstate = {
    token : localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user : null,
 };

  const initialToken = {
    token: null
  }
 const initialError = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
 }
 const initialLoad = {
    loading: false
 };
 const addRegister = {
    value: null
 }

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
        case 'OPEN_SEARCH':
            // console.log('Search reducer is triggered:')
        return { ...state, searchOpen : payload
        };
        case 'CLOSE_SEARCH':
            return {
                ...state, searchOpen: false
            };
        default : 
        return state
    }
}
 
export const error_Reducer = (state = initialError, action)=>{
    const {type, payload} = action;
    switch(type){
        case 'SET_FIELD_ERROR':
           return {
            ...state,
            [payload.field]: payload.message
           };

        case 'SET_ERROR': 
            // console.log('Error reducer is triggered:', payload) 
        return   { ...state,
                   ...payload  
        };

        case 'REMOVE_ERROR':
            return {
                ...initialError
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
    export const register_reducer = (state = null,action) => {
        const {type, payload} = action;
        switch(type){
            case 'SET_REGISTER':
                return payload;  
            case 'CLEAR_REGISTER':
                return null;
            
            default: 
            return null
        };
            
        }
    
        export const load_Reducer = (state = initialLoad, action)=>{
            const {type, payload} = action;
            switch(type){
                case 'SET_LOADING':
                    // console.log('Search reducer is triggered:')
                return { ...state, loading : true
                };
                case 'CLEAR_LOADING':
                    return {
                        ...state, loading: false
                    };
                default : 
                return state
            }
        }
         
        export const token_Reducer = (state = initialToken, action)=>{
            const {type, payload} = action;
            switch(type){
                case 'GET_TOKEN': 
                return  {
                    ...state, 
                    token: payload
                };
                case 'CLEAR_TOKEN' : 
                    return {
                        ...state,
                        token: null
                    }
                
                default : 
                return state
            }
        }

        // export const policy_Term = (state= initialCompany, action)=>{ 
        //     const {type, payload} = action;
        //     switch(type){
        //         case 'SELECT_TERM':
        //         return {...state, name : payload
        //         };
        //         default : 
        //         return state
        //     }
        // }

        export const login_loading = (state = initialLoad, action)=>{
            const {type, payload} = action;
            switch(type){
                case 'SET_LOGIN_LOADING':
                    // console.log('Search reducer is triggered:')
                return { ...state, loading : true
                };
                case 'CLEAR_LOGIN_LOADING':
                    return {
                        ...state, loading: false
                    };
                default : 
                return state
            }
        }
         export const fetch_reducer = (state = [], action) => {
            const {type, payload} = action;
            switch(type){
                case 'FETCH_DATA':
                return  payload;
                
                default : 
                return state
            }  
         }