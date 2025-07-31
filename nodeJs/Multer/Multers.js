const multer = require('multer')
const path = require('path');
const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: (req, file, cb ) =>{ 
//         console.log('FILE RECEIVED IN FILTER:', file);
//        return cb( null, imagePath)
//     },
//     filename: (req, file, cb )=>{
//        return cb( null, Date.now() + '-' + file.fieldname + path.extname(file.originalname))
//     }
// })

//     const checkFileType = (req, file, cb)=>{
//         const fileType = /jpeg|jpg|png|JPEG|JPG|PNG/
//         const mimeType = fileType.test(file.mimetype)
//         const extName = fileType.test(path.extname(file.originalname).toLowerCase())
        
//           if (!mimeType && !extName){
//             req.fileValidationError = 'Only image files are allowed'
//            cb('Only image files are allowed', false)
//            return;
//         } else
//         return cb(null, true)
//     }
   
//     const uploadProfile = multer({
//     storage,
//     limits : {fileSize : 2 * 1024 * 1024},
//     fileFilter: (req, file, cb)=>{
//         checkFileType(req, file, cb)
//     }
// })
// const newUpload = uploadProfile.single('avatar')

// const storage = multer.diskStorage({
//     destination: (req, file, cb ) =>{ 
//        return cb( null, "uploads/")
//     },
//     filename: (req, file, cb )=>{
//        return cb( null, Date.now() + '-' + file.fieldname + path.extname(file.originalname))
//     }+
// })
// const Uploads = multer({ storage})
// const Middleware = (req, res, next) =>{
//     // res.json({msg: 'Middleware!!!'})
//     console.log('I am middleware')
//     next()
// }

// 

//  app.use((err,req,res,next) =>{
//     if (err.code === 'LIMIT_FILE_SIZE'){
//         return res.status(400).send('File too large')
//         } else if (err instanceof multer.MulterError){
//             res.status(400).json(err.code)
//         } else if (err){
//             if ( err.message === 'FILE_MISSING'){
//                 res.status(400).json('FILE_MISSING')
//             } else {
//                 res.status(500).json('GENERIC_ERROR')
//             }
//         }
//         next()
//  })




//  app.post('/api/upload/image-profile', uploadProfile.single('avatar'), (req, res)=>{
//     if (req.file) {
//         console.log('IMAGE__FILE:', req.file);
//      res.json({msg : 'You have successfully uploaded this image', data : req.file});

//     } else {
//         console.log('IMAGE_FILE NOT FOUND');
//         return res.status(400).json({error: 'No file uploaded'});
 
//     };
// }
// )


// app.post('/api/upload/image-profile', (req, res)=>{
//     newUpload(req, res, function(err){
//        if(req.fileValidationError){
//            return res.status(400).json({error: req.fileValidationError})
//          } else if (!req.file){
//              return res.status(400).json({error: 'Please select an image to upload'})
//          }else if ((req.file.size/(1024 * 1024) > 2)){
//             return res.status(400).json({error:' this file is too small'})
//            } else if (err instanceof multer.MulterError){
//              return res.status(400).json({error: 'Multer error'})
//          } else if (err){
//              return res.status(500).json({error: 'Server error'})
//          } 
//          res.json({message: 'You have successfully uploaded this image',
//            data: req.file
//          });
//            console.log('REQ_FILE:', req.file)
//        }
//    )
// }      
//    )



// const storage = multer.diskStorage({
//     destination: (req, file, cb ) =>{ 
//        return cb( null, "Uploads/")
//     },
//     filename: (req, file, cb )=>{
//        return cb( null, Date.now() + '-' + file.fieldname + path.extname(file.originalname))
//     }
// })
// const Uploads = multer({ storage})
//  const uploads = Uploads.single('avatar')
//  app.post('/api/upload/images', (req, res)=>{
//     uploads(req, res, function(err){
//         console.log('reqFile:', req.file)
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
//          res.json({msg : 'You have successfully uploaded this image',
//             data : req.file
//          });
//            console.log(req.file)
//        }
//    )
// }      
//    )


