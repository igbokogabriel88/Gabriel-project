
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const {check, validationResult} =  require('express-validator')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')
// const jwt = require('jsonwebtoken')
// const authLogin = require('../middleware/requireLogin')2

router.get('/users', async(req, res)=>{
    const users = await User.find({})
    if(!users){
        return res.status(422).json({error: 'users not found...'})   
    }
    res.json({data: users })
})
router.get('/user', Auth, async (req, res)=>{
// console.log('user:' , req.user)
  const {_id} = req.user;
  
    const user = await  User.findById(_id)
    if (!user){
        return res.status(422).json({error: 'user not found...'})
    }
    // console.log('BACKEND_USER:', user )
    res.status(200).json({message: 'You are logged in', 
        User: user})
})
router.get('/admin', isAdmin, async (req, res)=>{
    const user = req.user
    try{
        console.log('userData', user)
    const users = await User.findById(user._id)
    // console.log('userDetail', users)
     res.status(200).json({msg: 'welcome admin', data: users})
    } catch(err){
        return res.status(422).json({error: 'user not found...'})
    }
    
  })
  


module.exports = router