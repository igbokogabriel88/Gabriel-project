 const express require('exprexx');
 const router = express.Router();
 const admin = require('firebase-admin');

 router.post('/'. async (req, res)=> {
    const {userId, address, network, amount} = req.body;

    try{
      const userRef = admin.firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) return res.status(404).send('User not found');
          const currentBalance = userDoc.data().interalBalnce || 0;

          if (amount > currentBalance)
            return res.status(400).send(':insufficient balance');

          await userRef.update({
            internalBalance: currentBalance - amount,
            lastWithdrawal: Date.now()
          });
           
          res.status(200).send('Withdrawal request successful')
    } catch (err){
        console.error(err);
        res.status(500).send('Internal error');
    }
 })