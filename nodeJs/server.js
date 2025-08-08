require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const Authuser = require('./routes/authRoute.js');
// const resetPassword = require('./routes/forgotPassword.js');
const authRegister = require('./routes/registerRoute.js');
const resetPassword = require('./routes/resetPassword.js');
const newPassword = require('./routes/newPassword.js');
const passwordReset = require('./routes/passwordReset.js')
const nftUserRegister = require('./routes/nftRegister.js')
const nftAuthLogin = require('./routes/nftLogin.js')
const authLogin = require('./routes/loginRoute.js')
const editProfile = require('./routes/editProfile.js')
const userImage = require('./routes/ImageRoute.js');
const changePassword = require('./routes/changePassword.js');
const subscribeEmail = require('./routes/subscribe.js');
const getDummyNFTs = require('./routes/dummyRoutes.js')
const Connection = require('./MongoDB/Connection.js')
const {upload} = require('./Multer/Multer.js')
const bodyParser = require('body-parser')

const app = express();
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))
 app.use('/images', express.static(path.join(__dirname, 'Multer','wrapper')))

 app.use('/api/auth', Authuser)
 app.use('/api/upload', userImage)
 app.use('/api/auth', authRegister)
 app.use('/api/user/nft', nftUserRegister)
 app.use('/api/auth/nft', nftAuthLogin)
 app.use('/api/auth', authLogin)
 app.use('/api/auth', resetPassword)
 app.use('/api/auth', passwordReset)
 app.use('/api/auth', newPassword)
 app.use('/api/auth/edit', editProfile)
 app.use('/api/auth', changePassword)
 app.use('/api/user', subscribeEmail)
 app.use('/api/get', getDummyNFTs)
//  app.use('/api, userBackend')
 app.use('/images', express.static(path.join(__dirname, "/wrapper")))
  

 
app.get('/', (req, res)=>{
    console.log('hello world, am Gabriel')
    res.json({msg: 'welcome nodeJS'})
})
app.get('/me', (req, res)=>{
    console.log('about gabriel')
    res.json({msg: 'You want to know about me?'})
})
Connection()
const port = process.env.PORT || 5000

app.listen(port,
    console.log(`app listening to port ${port}`)
)



