const  multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb ) =>{ 
       return cb( null, "profiles/")
    },
    filename: (req, file, cb )=>{
       return cb( null, Date.now() + '-' + file.fieldname + path.extname(file.originalname))
    }
})

    const checkFileType = (req, file, cb)=>{
        const fileType = /jpeg|jpg|png|JPEG|JPG|PNG/
        const mimeType = fileType.test(file.mimetype)
        const extName = fileType.test(path.extname(file.originalname).toLowerCase())
        
          if (!mimeType && !extName){
            req.fileValidationError = 'Only image files are allowed'
           cb('Only image files are allowed', false)
           return;
        } else
        return cb(null, true)
    }
   
module.exports.uploadProfile = multer({
    storage,
    limits : {fileSize : 2 * 1024 * 1024},
    fileFilter: (req, file, cb)=>{
        checkFileType(req, file, cb)
    }
})