const mongoose = require('mongoose')
const subscriptionSchema = new mongoose.Schema({
    
    email : { 
         type: String,
         required: true,
         unique: true
     },
     subscribeAt : { 
        type: Date,
        default: Date.now
    }
    
})
module.exports = mongoose.model('subscription', subscriptionSchema)
