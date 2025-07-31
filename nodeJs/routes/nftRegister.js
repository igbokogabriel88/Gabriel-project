const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')
// const authLogin = require('../middleware/requireLogin')2


router.post('/register', (req, res)=>{
    const {username, email, password} = req.body
    console.log('router:', username,  email, password)
 User.findOne({userEmail: email})
 .then((savedUser)=>{
     if(savedUser){
         console.log('true:', true)
          return res.status(400).json({error: 'User already exists'})
     }
       bcrypt.hash(password, 12)
       .then((hashedPassword) =>{
         const newUser =  new User({
             userName: username,
             userEmail: email,
             password: hashedPassword
             
         })
         newUser.save()
         .then(user =>{
             res.json({message: 'User successfully registered', data: user})
         })
         .catch (err =>{
             console.log(err)
             return res.status(500).json({error: 'Server error'})
         })
       })
 })
 .catch(err =>{
     console.log({error: err})
 })
}
)

module.exports = router

