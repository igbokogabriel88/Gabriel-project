const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')

router.post('/newPassword', (req, res)=>{
  console.log('NEW_PASSWORD_REQ_BODY:', req.body)
    const {newPassword} = req.body;
    const sendToken = req.body.newToken;
    
  
    User.findOne({resetToken: sendToken, expireToken: {$gt: Date.now()}})
    .then(savedUser =>{
      console.log('NEW_PASSWORD_SAVEDUSER:', savedUser)
     if(!savedUser){
         return res.status(400).json({error: 'Try again, session expired'})
     }
     bcrypt.hash(newPassword, 12)
     .then(hashedPassword =>{
      savedUser.password = hashedPassword
      savedUser.resetToken = undefined
      savedUser.expireToken = undefined
      savedUser.save().then((user) =>{
        console.log('NEW_PASSWORD_LATESTUSER:', user)
        res.json({message: 'Password updated successfully'})
      })
         
     })
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router
