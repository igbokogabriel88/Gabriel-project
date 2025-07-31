import { SET_ALERT, REMOVE_ALERT } from "../Action/ActionType"

const  initialState = {message: '', alertType: ''}
  const Alert = (state = initialState, action)=>{ 
    const {type, payload} = action
    switch(type){
        case 'SET_ALERT':
        return {...state, message : payload.msg, alertType: payload.alertType
        }

        case 'REMOVE_ALERT':
        return {...state, message: '', alertType: ''};
        default: return state;
    }
}
 export default Alert 