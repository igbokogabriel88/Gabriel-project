const express = require('express')
const router = express.Router()
const {Auth} = require('../AuthLogin/AuthLogin.js');
// const NftsUser = require('../Model/Nfts_User.js')
const NftUser = require('../Model/NftUser.js')

router.post('/nfts', async (req, res) => {
    try{
        // console.log('REQUEST_BODY:', req.body)
        const { email, username, walletAddress, _id} = req.body;
        console.log('REQ_EMAIL_USERNAME_ID:', email, username, _id, walletAddress)
        let nftUser = await NftUser.findOne({userId: _id});
        console.log('NFTS_USER:', nftUser)
    
        if (nftUser){
            return res.status(200).json({ message: 'Nftuser already exists',
                data: nftUser
            })
        }   
            nftUser =  new NftUser({
                userId: _id,
                username,
                email,
                walletAddress
            })
            await nftUser.save()
        console.log('NEWLY_CREATED_NFT_USER:', nftUser)

        return res.status(201).json({
            message: 'NftUser created successfully',
            data: nftUser
        })
    } catch (err) {2
        console.error('BACKEND_ERROR:', err)
           }
} 
)

module.exports =  router


// if (err.code === 11000){
        //     return res.status(400).json({error: 'Duplicate field value (email or username)'})
        //  }
        // return res.status(500).json({ error: 'Server error'})