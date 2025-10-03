const express = require('express')
const router = express.Router();
const mongoose = ('mongoose');
const {Auth} = require('../AuthLogin/AuthLogin.js');
const NftUser = require('../Model/Nfts_User.js');
const User = require('../Model/Auth.js');

router.post('/nfts', Auth, async (req, res) => {
    const allUser = await NftUser.find({});
    console.log('ALLUSER:', allUser)
    try {
        const {_id} = req.user;
        const user = await  User.findById(_id);
        //  console.log('NFT_USERS:', user);
         const {username, email} = user;
        const {walletAddress} = req.body;
        console.log('WALLET_ADDRESS:', walletAddress)

        if (!walletAddress) {
            return res.status(409).json({errors: 'Wallet address is required'});
        }
        const  normalizedAddress = walletAddress?.toLowerCase();
        let arrayAddress;
        if (typeof normalizedAddress === 'string') {
            arrayAddress = [normalizedAddress]
            // console.log('NORMALIZED_ADDRESS:', normalizedAddress)
        } else if (Array.isArray(normalizedAddress)) {
            arrayAddress = normalizedAddress
            // console.log('ARRAY_ADDRESS:', arrayAddress)
        } else{
            return res.status(400).json({ error: 'Invalid walletAddress format'})
        }
      
        // console.log('REQ_EMAIL_USERNAME_ID:', _id, arrayAddress, email, username);
         const targetAddress = arrayAddress[0];
        // console.log('TARGET:', targetAddress);
        
        const walletOwnedBySomeoneElse = await NftUser.findOne({
            walletAddress: {$in :[targetAddress]}
        });
        console.log('WAlletOwnedBySomeoneElse:', walletOwnedBySomeoneElse)
        if ( walletOwnedBySomeoneElse) {
            if (walletOwnedBySomeoneElse?.userId.toString() !== _id) {
                console.log('WALLETADDRESS IS LINKED TO SOMEONE ELSE')
            return res.status(409).json({errors: 'Wallet is already lined to another user '});
            //  return res.status(400).json({errors: 'Wallet is alraedy linked to your account'});
            } else {
                console.log('Wallet already linked to the user');
            } 
        }else {
                console.log('Wallet not linked to any user')
            }
            let nftUser;
            try{
                nftUser = await NftUser.findOne({userId: _id})
                .maxTimeMS(5000)
                .exec();
          
            } catch (err) {
                console.log('QUERY FAILED:', err)
                return res.status({error: 'Database query failed'})
            }
            console.log('NFTS_USER:', nftUser)
        if (nftUser) {
             if (nftUser.walletAddress.includes(targetAddress)){
                console.log('WALLETADDRESS_IS_LINKED_TO_YOUR_ACCOUNT');
            return res.status(200).json({ message: 'Wallet already linked to your account',
                value: nftUser
            });
        } else {
            console.log('WALLETADDRESS_IS_NOT_LINED_TO_YOUR_ACCOUNT')
            arrayAddress.forEach(address => {
                if(!nftUser.walletAddress.includes(address)) {
                    nftUser.walletAddress.push(address)
                }
            });
             await nftUser.save();
             console.log('NFTUSER_EXIST_SUCCESS:', nftUser)
             return res.status(200).json({message: 'Wallet linked successfully', data: nftUser})
        } 
       } else {
             newUser =  new NftUser({
                userId: _id,
                username,
                email,
                walletAddress: arrayAddress
            });
        }   
            await newUser.save()
        console.log('NEWLY_CREATED_NFT_USER:', newUser)

        return res.status(201).json({
            message: 'User created and wallet linked',
            data: newUser
        });
            
      } catch (err) {
      console.error('BACKEND_ERROR:', err);
      if (err.code === 11000){
      return res.status(409).json({error: 'Duplicate field value (email or username)'})
       }
      return res.status(500).json({ error: 'Server error'});
           }
} 
)

module.exports =  router


// if (err.code === 11000){
        //     return res.status(400).json({error: 'Duplicate field value (email or username)'})
        //  }
        // return res.status(500).json({ error: 'Server error'})