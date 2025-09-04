const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    id : { 
        type: String,
         
     },
    nftname : { 
         type: String,
         required: true,
         unique: true
     },
    amount : {
         type: String, 
         required: true
     },

     buyer : {
          type : String
     },
    seller : {
          type : String
     },
     commission : {
          type : String
     }, 
     timestamp : {
          type : String
     }
})
module.exports = mongoose.model('Transaction', transactionSchema)
