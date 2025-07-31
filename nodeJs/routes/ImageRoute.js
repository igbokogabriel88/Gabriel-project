const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {upload} = require('../Multer/Multer.js')

router.post('/image', upload.single('avatar'), (req, res)=>{
    if (req.file) {
        console.log('IMAGE__FILE:', req.file);
     res.json({message : 'You have successfully uploaded this image', data : req.file});

    } else {
        console.log('IMAGE_FILE NOT FOUND');
        return res.status(400).json({error: 'No file uploaded'});
    };
    }, (err, req, res, next) => {
    if (err instanceof multer.MulterError){
        return res.status(401).json({error : 'Multer error occurred', msg : err.message})
    }
      else if(req.fileValidationError){
           return res.status(402).json(req.fileValidationError)
         } else if ((req.file.size/(1024 * 1024) > 2)){
            return res.status(403).json(' this file is too large')
           }  else if (err){
             return res.status(500).json({error : 'Unknown error occurred'});
             console.error('EDIT_PROFILE BACKEND ERROR3:', err)
         } 
            next()
       }
   );
     
   const hello = () => {
    console.log('HELLO GABRIEL');
    
   }
 router.post('/picture',
         upload.single('avatar'),(req, res) =>{
            console.log('reqFile:',req.file);
            // console.log(req.file)
            // const {name} = req.body;
            const files = req.file;
    // if(!name || name.trim() === ''){
        if (!files){
        return res.status(400).json({error : 'no files uploaded '})
        }
        
    // } 
       return res.json({msg :'files are successfully uploaded', data : files
       })
    } )

    // router.post('/images', (req, res)=>{
    //     upload(req, res, function(err){
    //        if(req.fileValidationError){
    //            return res.status(400).json(req.fileValidationError)
    //          } else if (!req.file){
    //              return res.status(400).json('Please select an image to upload')
    //          }else if ((req.file.size/(1024 * 1024) > 2)){
    //             return res.status(400).json(' this file is too small')
    //            } else if (err instanceof multer.MulterError){
    //              return res.status(400).json(err)
    //          } else if (err){
    //              return res.status(400).json(err)
    //          } 
    //          res.json({message: 'You have successfully uploaded this image', data: req.file});
    //            console.log({msg : 'Image successfully uploaded', data :req.file})
    //        }
    //    )
    // }     
    //  )
    


module.exports = router