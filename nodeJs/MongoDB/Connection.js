const mongoose = require('mongoose')
const Connection= async ()=>{
    try{
        mongoose.set('strictQuery',false)
    mongoose.connect(process.env.MongoDB,
        console.log('MongoDB connected successfully')
    )} catch(error){
        console.log(error)
        process.exit()
    }
}
module.exports = Connection
