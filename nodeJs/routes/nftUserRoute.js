// const express = require('express')
// const router = express.Router()
// const {Auth} = require('../AuthLogin/AuthLogin.js')
// const NftUser = require('../Model/NftUser.js')

// router.post('/nfts', Auth, async (req, res)=>{
//    console.log('ANOTHER_REQUEST_BODY:', req.body)
//     const { username, email} = req.body;
//     const walletAddress = req.body.walletAddress;
//     console.log('REQ_BODY_WALLET_ADDRESS:', walletAddress)
//     const {_id} = req.user;
//     try{
//      const existingUser = await NftUser.findOne({userId: _id});
//          //  console.log('EXISTING_USER:', existingUser)
//      if (existingUser) {
//         return res.status(400).json({error: 'User already exists'});
//      }
     
//      const newUser = new NftUser(
//             { username,
//               email,
//               userId: _id,
//               walletAddress
//             });

//               await newUser.save();
//               console.log('SAVED_USER:', newUser)

//               return res.status(200).json({message: 'Nft user craeted successfully',
//                 data: newUser
//               });
//     } catch (err) {
//              console.log('Server error', err);
//                 }

// }
// )

// module.exports = router
