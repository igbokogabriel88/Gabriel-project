import { combineReducers } from 'redux';
import Alert from '../Alerts/Alert';
import {Category, search_Reducer, error_Reducer, auth_Reducer,
        profile_Reducer
} from './Reducer.jsx'

export default combineReducers({
        Alert,
        Category,
         search_Reducer,
         Error: error_Reducer,
         Auths: auth_Reducer,
         profile: profile_Reducer
})
