const mongoose = require('mongoose')
const NftDataSchema = new mongoose.Schema({
    tokenId : { 
        type: String,
        default: 0
             },
         event : { 
         type: String,
         },
    //  ownerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //     unique: true
    //      },
         buyer: {

         },
         owner: {
            type: String,
            default: 'walletAddress'
         },
         description: {
            type: 'String',
            default: ''
         },
         price: {
            type: Number,
            default: 0
         },
         sold: {
            type: Boolean,
            default: false
         },
         nftAddress: {
            type: String,
            default: ''
         },
         listingId :{
            type: Number,
            fefault: 1
         },
         category: {
            type: 'String',
            default: ''
         },
         listed: {
            type: Boolean,
            default: false
         },
         image: {
            type: String,
            default: ''
         },
         transaction : [{nftName: '', amount: '', buyer:'', seller: '', commission:'', doneAt:'', id:auto}],
    createdAt: {
        type: Date,
        default: Date.now
      }
       
    
})
module.exports = mongoose.model('Nft_user', userNftSchema)
