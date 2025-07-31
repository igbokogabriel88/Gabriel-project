const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName : { 
        type: String,
         required: true,
         unique: true},
    userEmail : { 
         type: String,
         required: true,
         unique: true},
    password : {
         type: String, 
         required: true},
     userImage : {
          type : String
     },
     resetToken:  String,
     expireToken: Date,
     bio: String,
     social: Object

     // userStatus : {
     //      type : String,
     //      required: true
     // }
//     userAge : {
//          type: Number},
//     phone_number : {
//          type : Number
//     }
})
module.exports = mongoose.model('User', userSchema)
