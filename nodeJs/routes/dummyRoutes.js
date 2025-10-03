const express = require('express');
const router = express.Router();
const dummyNFTs = require('../dummy.js');

router.get('/nfts', (req, res) => {
    // -3console.log('DUMMY DATA IS FETCHED')
    res.json(dummyNFTs)
})


module.exports = router
