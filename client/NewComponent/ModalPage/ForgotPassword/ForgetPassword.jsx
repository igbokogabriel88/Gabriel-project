import React, {useState} from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa";
import { resetPassword } from "../../helperFunc"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorResetPassword } from "../LoginErrors";
import { set_Error, removeError } from "../../Redux/Action/Action";

const ForgotPasswordPage = ({passwordFunc}) => {
    const [data, setData] = useState({ email: ''
 }); 
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const errors = useSelector(state => state.Error);
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


     const handleChange = (e) => {
      const {name, value} = e.target;
      setData({...data, [name]: value});
      
      ErrorResetPassword(name, value, emailRegex, dispatch )
         };
     console.log('RESET_DATA:', data)
    const handleReset = async (e) => {
      e.preventDefault();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const error = {};
      console.log('RESET_ERROR:', error)

      const {email} = data; 
     if ( !email || email?.trim === ''){
      error.email = 'Email is required';
      } else if (!emailRegex.test(email)){
       error.email = 'Invalid email address';
       };
              
      console.log('RESET_ERROR:', error)
        dispatch(set_Error(error))
              
        const hasErrors = Object.values(error).some(err => err !== '');
        if (hasErrors) {
            console.log('BLOCKING SUBMIT DUE TO ERRORS')
            dispatch(set_Error(error))
            return;
        }                
       
         dispatch(removeError());
         console.log('ANOTHER RESET  ERROR:', error)
            const newData = {email}    
           await resetPassword(newData, dispatch, navigate);    
           
           setData({...data,
                     email: ''
            });
        //  console.log('ERRORS_ERROR:', errors)
         }; 
                              
           
         
    return (
     <div className="containerForgot yes">
        <span ><FaTimes onClick={passwordFunc}
             className='iconClass'/></span>
        <div className="mainGroup forgot">
        <div className="title">
          Forgot Password</div>
        <form className="formClass" onSubmit={handleReset}>
        
        <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input type="email"
        id="email"
        name="email"
        placeholder="Provide your email address"
        value={data.email}
        onChange={handleChange}/>
        <FaEnvelope className="icon"/>
        </div>
        {errors?.email &&
        <span style={{color: 'red', position: 'absolute', left: '5%', top: '60%',
         overflow: 'hidden', whiteSpace: 'nowrap'}}>
          {errors.email}</span>}
        <input type="submit" value='Reset' className="submitClass"/>
        
        </form>
        </div>
     </div> )
}
export default ForgotPasswordPage