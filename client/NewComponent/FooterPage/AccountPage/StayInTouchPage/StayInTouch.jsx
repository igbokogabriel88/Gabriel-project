import React from "react"
import { useState } from "react";
import { ErrorSubscribeEmail } from "../../../ModalPage/LoginErrors";
import { removeError, set_Error } from "../../../Redux/Action/Action";
import { sendSubscribeEmail } from "../../../helperFunc";
import { useSelector, useDispatch } from "react-redux";
import './StayInTouch.css'

export const StayInTouch = ()=>{
    const [data, setData]= useState({
        email: ''
    });
    const dispatch = useDispatch();
    const errors = useSelector(state => state.Error)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const handleChange = async (e)=>{
    const {name, value} = e.target;
    setData({...data, [name]: value});

       await ErrorSubscribeEmail(name, value, emailRegex, dispatch)
    };

    const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log('form SUBSCRIBE EMAIL FORM SUBMITTED');
    dispatch(removeError());

      const error = {};
      console.log('RESET_ERROR:', error);
      console.log('SUBSCRIBE_EMAIL:', data)

      const {email} = data; 
     if ( !email || email?.trim === ''){
      error.email = 'Email is required';
      } else if (!emailRegex.test(email)){
       error.email = 'Invalid email address';
       } else { error.email = ''};
              
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
           await sendSubscribeEmail(newData, dispatch);    
           
           setData({...data,
                     email: ''
            });
       
        }
    
    return (
        <form className="stayInTouchClass" 
        onSubmit={handleSubmit}>
            <span> Stay in touch</span>
            <p>Don't miss anything. Stay in touch with us and get real time update</p>
            <input 
            type="email"
            name= "email"
            value= {data.email}
            placeholder="Email address"
            className="inputClass"
            onChange={handleChange}
            />
            {errors?.email && 
        <span style={{color: 'red', marginTop: '41%', 
         marginLeft: '8px', position: 'absolute', padding: '4px 8px',
         backgroundColor: 'white', borderRadius: '4px'
        }}>
            {errors.email}</span>}

            < input  
            type="submit"
            value='Submit'
            className={`submitForm ${errors?.email ? 'down' : ''}`}
            />
        </form>
    )
}