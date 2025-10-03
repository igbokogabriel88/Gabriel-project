const mongoose = require('mongoose');

// if (mongoose.connection.models['NftsUser']) {
//     delete mongoose.connection.models['NftsUser']
// }

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
        type: [String],
    default: []
     },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
         },
    balance : {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
      }  
    
})
userNftSchema.index({userId: 1});
userNftSchema.index({walletAddress: 1})
module.exports = mongoose.model('NftsUser', userNftSchema)
