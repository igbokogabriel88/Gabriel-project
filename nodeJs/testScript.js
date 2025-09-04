require('dotenv').config()
const pinataSDK = require('@pinata/sdk');
const { fs } = require('fs');
const https = require('https');

const testNFTStorage  = async () => {
    const pinata = new pinataSDK(
        process.env.PINATA_API_KEY,
        process.env.PINATA_SECRET_KEY
    );
    console.log('Testing Pinata connection...');

    pinata.testAuthentication()
    .then(result => {
        console.log('Authentication:', result.authenticated);
    }).catch(error => {
        console.log('Connection failed:', error.message);

    });

 }
   testNFTStorage()