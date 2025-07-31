const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')
// const authLogin = require('../middleware/requireLogin')2


router.post('/register', (req, res)=>{
    const {username, email, password, status, phone_number, pic, age} = req.body
    console.log('router:' , email, password, age)
 User.findOne({userName: username})
 .then((savedUser)=>{
     if(savedUser){
         console.log('true:', true)
          return res.status(400).json({error: 'user already exist'})
     }
       bcrypt.hash(password, 12)
       .then((hashedPassword) =>{
         const newUser =  new User({
             userName: username,
             userEmail: email,
             password: hashedPassword,
             userStatus: status,
             userAge: age,
             
             phone_number
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
 .catch(err =>{3
     console.log(err)
 })
}
)

module.exports = router

