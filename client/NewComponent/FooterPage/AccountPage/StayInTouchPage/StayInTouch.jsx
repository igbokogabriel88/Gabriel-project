import React from "react"
import { useState } from "react";
import './StayInTouch.css'

export const StayInTouch = ()=>{
    const [email, setEmail]= useState('')
    const handleChange =(e)=>{
        console.log('handle change')
        setEmail(e.target.value)
    }

        const handleSubmit = (e)=>{
            e.preventDefault()
            console.log('form submitted')
        }
    
    return (
        <form className="stayInTouchClass" onSubmit={handleSubmit}>
            <span> Stay in touch</span>
            <p>Don't miss anything. Stay in touch with us and get real time update</p>
            <input 
            type="email"
            placeholder="Email address"
            className="inputClass"
            onChange={handleChange}
            />
            < input  
            type="submit"
            value='Submit'
            className="submitForm"
            />
        </form>
    )
}