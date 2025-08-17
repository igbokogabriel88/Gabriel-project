const mongoose = require('mongoose')
const userNftSchema = new mongoose.Schema({
    username : { 
        type: String,
        required: true,
        unique: true
     },
    email : { 
         type: String,
         required: true,
         unique: true
         },
     walletAddress: {
        type: String,
        required: true,
        default: ''
     },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
         },
    createdAt: {
        type: Date,
        default: Date.now
      },
    balance : {
        type: Number,
        default: 0
    }    
    
})
module.exports = mongoose.model('Nft_user', userNftSchema)
