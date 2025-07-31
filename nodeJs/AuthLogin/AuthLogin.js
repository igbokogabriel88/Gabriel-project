const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
const User = require('../Model/Auth.js')
const jwt = require('jsonwebtoken')

   const Auth = (req, res, next)=>{
     const token = req.header('x-auth-token')
    
         console.log('headers received:', token)
    if (!token){
        return res.status(422).json({error: 'access denied. Not authenticated...'})
    }
    try{
        const Users = jwt.verify(token, process.env.secretKey)
        req.user = Users
      next()
    } catch (err){
       return res.status(422).json({error: 'Acess denied. invalid auth token...'})
    }
}
    const IsAdmin = async (req, res, next)=>{
      const {_id} = req.user 
      const user = await User.findById(_id)
      console.log(user)
      try{
            if (user.userStatus === 'admin'){
              next()
            }
            return res.status(422).json({error: 'Acess denied. invalid auth token...'})
      } catch (err){
        console.log(err)
      }
}
   const isAdmin =  (req, res, next) =>{
    Auth(req, res, () =>{
      const {_id} = req.user
      User.findById(_id)
      .then(users => {
        if (users.userStatus != 'admin'){
          return res.status(422).json({error: 'Acess denied. not authorized...'})
        }
        next()
      }).catch (err =>{
        console.log(err)
      }) 
    })
   }
  module.exports = {Auth, IsAdmin, isAdmin}