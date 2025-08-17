const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')
// const authLogin = require('../middleware/requireLogin')2


router.post('/register', async (req, res)=>{
    const {username, email, password} = req.body;

    try{
     const existingUser = await User.findOne({email});
         //  console.log('EXISTING_USER:', existingUser)
     if (existingUser) {
        return res.status(400).json({error: 'User already exists'});
     }
     const hashedPassword = await bcrypt.hash(password, 12);

     const newUser = new User(
            { username,
              email,
              password: hashedPassword});

              await newUser.save();
              console.log('SAVED_USER:', newUser)

              return res.status(200).json({message: 'User registered successfully',
                data: newUser
              });
    } catch (err) {
            //  console.log('Server error', err);
             if (err.code === 11000){
                return res.status(400).json({error: 'Duplicate field value (email or username)'})
             } 
             return res.status(500).json({error: 'Internal server error'})
    }
//     console.log('REGISTRATION ROUTE:', username,  email, password)
//  User.findOne({userEmail: email})
//  .then((savedUser)=>{
//     console.log('SAVED_USER:', savedUser);
//      if(savedUser){
//          console.log('true:', true)
//           return res.status(401).json({error: 'User already exists'})
//      }
//        bcrypt.hash(password, 12)
//        .then((hashedPassword) =>{
//          const newUser =  new User({
//              userName: username,
//              userEmail: email,
//              password: hashedPassword
             
//          })
//          newUser.save()
//          .then(user =>{
//              res.json({message: 'User successfully registered', data: user})
//          })
//          .catch (err =>{
//              console.log(err)
//              return res.status(500).json({error: 'Server error'})
//          })
//        })
//  })
//  .catch(err =>{
//      console.log({error: err})
//  })
}
)

module.exports = router

