const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Subscription = require('../Model/subscription.js')


const saveToDatabase = async (email) => {
    // const existingEmail = await Subscription.findOne({email});
    //     console.log('EXISTING_EMAIL:', existingEmail)
    //     if (existingEmail){
    //         return res.status(400).json({error: 'Email already subscribed'})
    //     };

    const sentEmail = new Subscription({email: email});
    await sentEmail.save()
    console.log('SUBSCRIBE_EMAIL_SUCCESS:', sentEmail)

}
    
router.post('/subscribe', async (req, res)=>{
    const { email } = req.body
    console.log('SUBSCRIBE_ROUTE:' , email);
    try{
        if (!email){
            return res.status(400).json({error: 'Invalid email address'})
        };
          await saveToDatabase(email) 

    
    return  res.status(200).json({message: 'Thanks for subscribing!'})
    } catch(err){
        if (err.code === 11000){
            return res.status(400).json({error: 'Duplicate field value (email or username)'})
         }
        return res.status(500).json({ error: 'Server error'})
    }  
}
)

module.exports = router
  // if (err.code === 11000){
        //     res.status(400).json({
        //         error: 'Email already subscribed'
        //     });
        // } else {
           
        // }
    
