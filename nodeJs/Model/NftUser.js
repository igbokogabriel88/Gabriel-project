const mongoose = require('mongoose')
const nftUserSchema = new mongoose.Schema({    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
         },
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
        unique: true,
        default: ''
     },
     balance : {
        type: Number,
        default: 0
    },
     createdAt : { 
        type: Date,
        default: Date.now
    }
    
})
module.exports = mongoose.model('nftUser', nftUserSchema)
