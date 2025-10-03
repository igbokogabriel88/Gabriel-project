const mongoose = require('mongoose')
const TransactionSchema = new mongoose.Schema({
    transactionHash : { 
        type: String,
         unique: true,
         // sparse: true
     },
    blockNumber : { 
         type: Number,
         required: function() {
            return this.status === 'confirmed' || 
            this.staus === 'failed';
         },
         index: true
     },
     tokenId : { 
        type: String,
         unique: true,
     },
     exhibitionId: {
      type: Number,
      default: 0
     },
    type : {
         type: String, 
         required: true,
         enum: ['mint', 'list', 'sale', 'exhibition_join', 'approval', 'cancel'],
         index: true
     },
     from : {
          type : String,
          index: true
     },
     status: {
         type: String,
         enum: ['pending', 'confirmed', 'failed', 'rejected'],
         required: true
     },
     to:  {
        type: String,
        index: true
     },
     amount: {
        type: String
     },
     nft: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'NFT',
     },
     gasUsed: {
      type: String
     },
     listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
     },
     errorMessage: {
      type: String
     },
     rejectType: {
      type: String,
      enum: ['user-rejection', 'wallet-error', 'network-error', 'other'],
      required: false
     },
     createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
}
// , {timestamps: true}
);

TransactionSchema.index({nft: 1, createdAt: 1});


module.exports = mongoose.model('Transaction', TransactionSchema)
