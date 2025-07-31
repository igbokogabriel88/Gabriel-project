// const express = require('express')
// const router = express.Router()
// require('dotenv').config();
// const admin = require('firebase-admin');

// // const serviceAccount = require('./firebase-key.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
// const db = admin.firestore();

// const addUser = async (username) => {
//     const userRef = db.collection('users').doc(username);
//     const docSnap = await userRef.get();

//     if( docSnap.exists ) {
//         throw new Error('User already exists')
//     } else {
//         await userRef.set({
//             username: username,
//             createdAt: date.now()
//         })
       
//     }
// }


//  router.post('/backend/register', async (req, res) => {
//     const {username} = req.body;
//         try{
//             await addUser(username);
//             res.status(200).json({msg: 'New user successfully created'})
//         } catch (err) {
//             res.status(400).json(err.message)
//         }
//  })



// module.exports = router