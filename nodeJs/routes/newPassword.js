const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')

router.post('/new-password', (req, res)=>{
    const {newPassword} = req.body;
    const sendToken = req.body.token;
    User.findOne({resetToken: sendToken, expiryToken: {$gt: date.now()}})
    .then(savedUser =>{
     if(!savedUser){
         return res.status(400).json({error: 'Try again, seession expired'})
     }
     bcrypt.hash(newPassword, 12)
     .then(hashedPassword =>{
      savedUser.password = hashedPassword
      savedUser.resetToken = undefined
      savedUser.expiryToken = undefined
      savedUser.save().then((user) =>{
        res.json({message: 'Password updated successfully'})
      })
         
     })
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router
