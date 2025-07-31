import React, {useState} from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa";
import { resetPassword } from "../../helperFunc"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_Error, removeError } from "../../Redux/Action/Action";

const ForgotPasswordPage = ({passwordFunc}) => {
    const [data, setData] = useState({ email: ''
 }); 
      const navigate = useNavigate();
      const Error = {};
      const dispatch = useDispatch();
      const errors = useSelector(state => state.Error);

     const handleChange = (e) => {
      const {name, value} = e.target;
      setData({...data, [name]: value})
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
              
                       
         if (Object.keys(error).length > 0) {
         console.log(' RESET ERROR:', error)
            return ;
            }
         dispatch(removeError());
         console.log('ANOTHER RESET  ERROR:', error)
                   
           await resetPassword({email}, Error, dispatch, navigate);      
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