const mongoose = require('mongoose');
const { checkConnection} = require('./checkConnection');
 
const connectionOptions = {
    socketTimeOutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 300000
};

const Connection= async ()=>{
    try{
        // console.log('connecting to MongoDb...');
        console.log('connection String:', process.env.MongoDB);
        // console.log('MongoDB Connecting String')
        mongoose.set('strictQuery',false);

        
        await mongoose.connect(process.env.MongoDB, connectionOptions);
    console.log('MongoDB connected successfully');
        
    console.log('Database Name:', mongoose.connection.name);
    //    return true;
} catch(error){
        console.log('MongoDb Connection Failed:',error.message);
        console.log('Failed to connect to mongodb')
        // return false;
        process.exit(1)
    }
} 
     
module.exports = Connection




// const Transaction = require('../Model/Transaction.js');
// const { setupTransactionListeners } = require('../routes/EventListener/Listener.js')

// const pendingTx = async () => {
//     if (mongoose.connection.readyState !== 1) {
//         throw new Error('Database not connected')
//     }
//     try{
//      const pendingTransaction = await Transaction.find({status: 'pending'})
//                 .populate('nft', 'nftAddres ownerName userId').exec();
//      console.log(`Found ${pendingTransaction.length} pending transactions`);
//      console.log('Pending_transaction:', pendingTransaction);

//       pendingTransaction.forEach(tx => {
//      setupTransactionListeners(tx.transactionHash, tx.nft.nftAddress, tx.nft.username, tx.nft.userId);
//      });
//     } catch (err) {
//        console.error('Error setting up listeners for pending transactions:', err)
//     }
// }

 