const mongoose = require('mongoose')
// const Connection= async ()=>{
//     try{
//         mongoose.set('strictQuery',false)
//     mongoose.connect(process.env.MongoDB,
//         console.log('MongoDB connected successfully')
    
//     )} catch(error){
//         console.log(error)
//         process.exit()
//     }
// }
const Connection= async ()=>{
    try{
        mongoose.set('strictQuery',false)
    mongoose.connect(process.env.MongoDB, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }
        // console.log('MongoDB connected successfully')
);
console.log('MongoDB connected successfully');
mongoose.connection.on("connected", () => {
    // console.log('Mongoose connected to DB:', mongoose.connection.db.databaseName);
    // console.log('Host:', mongoose.connection.host)
})
} catch(error){
        console.log(error)
        process.exit()
    }
}
module.exports = Connection
