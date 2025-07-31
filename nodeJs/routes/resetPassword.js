
const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const router = express.Router();
const User = require('../Model/Auth.js');

const transporter = nodemailer.createTransport(sendgrid({
  auth: {
    api_key: process.env.SEND_GRID_API_KEY
  }
}))

 router.post('/reset-password', async (req, res) =>{
      
       try{
        const {email} = req.body;
        console.log('RESET_EMAIL:', email)
        const user = await User.findOne({ userEmail: email});

          if (!user) {
            return res.status(400).json({error: 'User not found'});
          }
          const token = crypto.randonBytes(32).toString('hex');
          const tokenExpiry = Date.now + 3600000;

          user.resetToken = token;
          user.expireToken = tokenExpiry;
          await user.save();

          
           const resetLink =`http://localhost:5173/reset/${token}`;
            
           await transporter.sendMail({
            to: user.email,
            from: 'igbokogabriel04@gmail.com',
            subject: 'Password Reset',
            html: `<p>You requested for password reset</p>
            <p>Click this link to reset your password:</p>
            <a href = "${resetLink}"> Link</a> to reset your password`
           });
            return res.status(200).json({message: 'Check your email'})

          //  res.json({message: 'Password reset email sent'});

       } catch(err) {
          console.log('PASSWORD RESET ERROR:', err);
          if (!res.headersSent){
           return  res.status(500).json({message: 'Server error'})
          }
                 }
 })
        
 module.exports = router

