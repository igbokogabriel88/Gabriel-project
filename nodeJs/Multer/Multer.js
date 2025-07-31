const FS = require('fs');
const multer = require('multer')
const path = require('path');
const fs = require('fs');

console.log('__dirname is:',__dirname);
console.log(path.join(__dirname, 'wrapper'))
const imagePath = path.join(__dirname, 'wrapper');
if(!fs.existsSync(imagePath)){
    fs.mkdirSync(imagePath, {recurcive: true});
    console.log('Uploads folder created at:',  imagePath);
}
const storage = multer.diskStorage({
    destination: (req, file, cb ) =>{ 
        console.log('FILE RECEIVED IN FILTER:', file);
        cb(null, imagePath);
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
   
module.exports.upload = multer({
    storage,
    limits : {fileSize : 2 * 1024 * 1024},
    fileFilter: (req, file, cb)=>{
        checkFileType(req, file, cb)
    }
})