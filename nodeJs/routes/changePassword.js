const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {Auth, IsAdmin, isAdmin} = require('../AuthLogin/AuthLogin.js')
// const bcrypt = require('bcryptjs')
const User = require('../Model/Auth.js')

router.post('/change-password', Auth, async (req, res)=>{
    const {oldPassword, newPassword} = req.body;
    const {_id} = req.user;
   
    try{
        const user = await User.findById(_id);
        if (!user) {
            return res.status(400).json({error: 'User not found'});

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isAdmin) return res.status(404).json({error: 'Old password is incorrect'});

            const hashedNew = await bcrypt.hash(newPassword, 12);
            user.password = hashedNew;
            await user.save();

            return res.json({message: 'Password changed successfully'})
        }
    } catch (err) {
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router
