require('dotenv').config()
const pinataSDK = require('@pinata/sdk');
const  fs = require('fs');
const path = require('path');
const https = require('https');

const testStream = () => {
    filePath = path.join(__dirname,'Multer', 'wrapper', '1756834129635-avatar.jpg');
     console.log('FILEPATH:', filePath);
    if (!fs.existsSync(filePath)) {
        console.log('File not found');
        fs.readdir(__dirname, (err, files) => {
            if (err) return;
            console.log('Available files:', files)
        })
        return;
    }
    console.log('File found! Creating stream...');
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (error) => {
        console.log('Stream error:', error.message)
    });
    fileStream.on('open', () => {
        console.log('Stream opened successfully')
    });
    return fileStream
}
 testStream()