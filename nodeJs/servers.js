require('dotenv').config()
const express = require('express')
 const bodyParser = require('body-parser')
  const cors = require('cors')
const mongoose = require('mongoose')
// const {checkFileType} = require('./multer/file')
 const {upload} = require('./multer/file')
// const {imageFilter} = require('./multer/file')
const app = express()
const  multer = require('multer')
const path = require('path')
const connectDB = require('./connect.js')
// const corsOption = {origin : true,
//     credentials : true,
//     methods : ["GET", "POST", "PUT", "DELETE"]
// }
 app.use(express.json())
//  app.use(express.urlencoded({extended: true}))
 app.use(cors())
//  
 app.use(express.static('public'))
 app.use('/images', express.static(path.join(__dirname, '/upload')))
 app.use((err,req,res,next) =>{
    if (err.code === 'LIMIT_FILE_SIZE'){
        return res.status(400).send('File too large')
        } else if (err instanceof multer.MulterError){
            res.status(400).json(err.code)
        } else if (err){
            if ( err.message === 'FILE_MISSING'){
                res.status(400).json('FILE_MISSING')
            } else {
                res.status(500).json('GENERIC_ERROR')
            }
        }
        next()
 })
// //  app.use(cors(corsOpt2.ion))
//   app.use(bodyParser.urlencoded({ extended : true}))
//   app.use(bodyParser.json())
 
 
 app.use('/api/user', require('./routes/user'))
 app.use('/api/auth', require('./routes/auth'))
 const storage = multer.diskStorage({
    destination: (req, file, cb ) =>{ 
       return cb( null, "uploads/")
    },
    filename: (req, file, cb )=>{
       return cb( null, Date.now() + '-' + file.fieldname + path.extname(file.originalname))
    }
})
const Uploads = multer({ storage})
  const uploads = Uploads.single('avatar')

 app.post('/api/upload/image', (req, res)=>{
     uploads(req, res, function(err){
        if(req.fileValidationError){
            return res.status(400).json(req.fileValidationError)
          } else if (!req.file){
              return res.status(400).json('Please select an image to upload')
          }else if ((req.file.size/(1024 * 1024) > 2)){
             return res.status(400).json(' this file is too small')
            } else if (err instanceof multer.MulterError){
              return res.status(400).json(err)
          } else if (err){
              return res.status(400).json(err)
          } 
          res.json('You have successfully uploaded this image');
            console.log(req.file)
        }
    )
 }      
    )

app.get('/home', (req, res)=> {
    res.sendFile(__dirname + '/index.html')
    // 
    console.log(req.file)
    console.log('file started')
})
app.post("/profile", Uploads.single('avatar'),
    function (req, res, next) {
        console.log(req.file)
        // try{
        //     return res.json({message : 'File uploaded successfully'})
        // }catch(err){
        //     return res.status(400).json({message : err.message})
        // }
        if ( req.file){
            return res.json({message : 'File uploaded successfully'})
        }
        return res.status(400).json({message : err.message})
    }
)
app.get('/about',(req,res)=>{
    console.log('I am a proud programmer, i am so excited'),
    res.status(200).json('hello family and friends')
})
connectDB()
const port = process.env.PORT || 5000
app.listen(port,
    console.log(`app listening to port ${port}`)
)



app.post('/api/upload/images', upload.single('avatar'), (req, res)=>{
    if (!req.file){
      return res.status(400).json({error: 'Please select an image to upload'})
    } 
      console.log('REQ_FILE:', req.file)
      res.json({message: 'File uploaded successfully'})
      
},(err, req, res, next) =>{
   
  if(req.fileValidationError){
  return res.status(401).json(req.fileValidationError)
  } else if ((req.file.size/(1024 * 1024) > 2)){
  return res.status(402).json({error: 'this file is too big'})
  } else if (err instanceof multer.MulterError){
  return res.status(403).json({error: 'Multer error'})
  } else if (err){
  return res.status(400).json({error: 'Unknown error occurred.'})
  } 
     next();
      }
   ) 
       
