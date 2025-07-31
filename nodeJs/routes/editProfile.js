const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
const {Auth} = require('../AuthLogin/AuthLogin.js')
const User = require('../Model/Auth.js')

router.put('/profile', Auth, async (req, res) => {
    try{
         console.log('BACKEND EDITING:', req.body);
         
        const {_id} = req.user;
        console.log('BACKEND EDITING USER_ID:', _id);
        const {bio, updatedImage, facebook, instagram, youtube} = req.body;
        
        const updateData = {
            bio, 
            social: {facebook, instagram, youtube},
        }
        if (updatedImage) updateData.userImage = updatedImage?.filename

         const updatedUser = await User.findByIdAndUpdate(_id, updateData,{
            new: true
         });
         res.json({message: 'Profile updated', userData: updatedUser})

      } catch (err) {
           console.error('EDIT_PROFILE ERROR:', err);
           res.status(500).json({error: 'Profile update failed'})
    }
})

module.exports = router