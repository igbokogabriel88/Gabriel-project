const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')

router.post('/login', (req, res)=>{
    const {email, password} = req.body;
    User.findOne({email})
    .then(savedUser =>{
     if(!savedUser){
         return res.status(400).json({error: 'Invalid email'})
     }
     bcrypt.compare(password, savedUser.password)
     .then(isMatched =>{
         if(!isMatched){
             return res.status(400).json({error: 'Incorrect password'})
         }
            const token = jwt.sign({_id: savedUser._id}, process.env.secretKey)
         res.json({message: 'Login success', data: {user: savedUser, token}})
     })
    })
})

module.exports = router
