import { combineReducers } from 'redux';
import Alert from '../Alerts/Alert';
import {Category, search_Reducer, error_Reducer, auth_Reducer,
profile_Reducer, register_reducer, load_Reducer, token_Reducer,
login_loading, fetch_reducer
} from './Reducer.jsx'

export default combineReducers({
        Alert,
        Category,
         search_Reducer,
         Error: error_Reducer,
         Auths: auth_Reducer,
         profile: profile_Reducer,
         addRegister: register_reducer,
         Loading: load_Reducer,
         getToken: token_Reducer,
         loginLoading: login_loading,
         fetchData: fetch_reducer
        //  policyTerm: policy_Term
})
