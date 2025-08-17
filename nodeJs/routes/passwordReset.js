const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const sendgrid = require('nodemailer-sendgrid-transport');
const router = express.Router();
const User = require('../Model/Auth.js');

const transporter = nodemailer.createTransport(sendgrid({
  auth: {
    api_key: process.env.SEND_GRID_API_KEY
  }
}))

 router.post('/password-reset', async (req, res) =>{
       const {email} = req.body;
       console.log('RESET EMAIL:', email)

       if (!email) {
        // console.log('BACKEND ERROR: EMAIL IS REQUIRED');
        return res.status(400).json({error: 'Email is required'})
       }

       User.findOne({userEmail: email})
       .then(user => {
        // console.log('RESET USER:', user)
        if (!user) {
            return res.status(401).json({error: 'User not found'});
        }

         const token = crypto.randomBytes(20).toString('hex');

         user.resetToken = token;
         user.expireToken =Date.now() + 3600000;

         return user.save().then(() => {
            const resetURL = `http://localhost:5173/reset-password/${token}`;
            const mailOptions = {
                to: email,
                from: 'no-reply@example.com',
                subject: 'Password reset',
                html: `
                <p> You requested for a password reset.</p>
                <p> Click <a href = "${resetURL}">Here </a> to reset your password.</p>
                `
            }

            return transporter.sendMail(mailOptions);
         })
       })
       .then(() => {
         res.status(200).json({message: 'Reset email sent successfully'})
       })
       .catch(err => {
        console.error('Error during password reset:', err)
        res.status(500).json({error: 'Server error while sending email'})
       })
    //    try{
    //     const user = await User.findOne({ userEmail: email});

    //       if (!user) {
    //         return res.status(400).json({message: 'Email not found'});
    //       }
    //       const token = crypto.randonBytes(32).toString('hex');
    //       const tokenExpiry = Date.now + 3600000;

    //       user.resetToken = token;
    //       user.expiryToken = tokenExpiry;
    //       await user.save();

          
    //        const resetLink ='http://localhost:5173/reset/${token}';
            
    //        await transporter.sendMail({
    //         to: user.email,
    //         from: 'no-reply@gmail.com',
    //         subject: 'Password Reset',
    //         html: `<p>You requested for password reset</p>
    //         <p>Click this link to reset your password:</p>
    //         <a href = "${resetLink}"> Link</a> to reset your password`
    //        });
    //        res.json({message: 'Check your email'})

    //        res.json({message: 'Password reset email sent'});

    //    } catch(err) {
    //        res.status(500).json({message: 'Server error'})
    //              }
 })
        
 module.exports = router

