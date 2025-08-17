const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')

router.put('/changePassword', Auth, async (req, res)=>{
    console.log('REQUEST BODY:', req.body)
    const {oldPassword, newPassword} = req.body;
    const {_id} = req.user;
    // console.log('CHANGE PASSWORD USER ID:', _id)
   
    try{
        const user = await User.findById(_id);
        // console.log('REQUEST USER:', user)
        if (!user) {
            return res.status(400).json({error: 'User not found'}); 
        }

       const isMatch = await bcrypt.compare(oldPassword, user.password);
       if (!isMatch) return res.status(404).json({error: 'Old password is incorrect'});

       const hashedNew = await bcrypt.hash(newPassword, 12);
       user.password = hashedNew;
       await user.save();

            return res.json({message: 'Password changed successfully'})
        
    } catch (err) {
        console.log('Server error', err);
             if (err.code === 11000){
                return res.status(400).json({error: 'Duplicate field value (email or username)'})
             }
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router
