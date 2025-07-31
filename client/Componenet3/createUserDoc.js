import {doc, setDoc, GetDoc} from 'firebase/firestore';
import {auth, db} from './firebase'
//import { userInfo } from 'os';
//import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
 export const createUserIfNOtExists = async () => {
    const user = auth.currentUser;
    if(!user) return;
     const userRef = doc(db, 'users', user.uid);
     const snapshot = await getDoc(userRef);

     if(!snapshot.exists()){
        await setDoc(userRef, {
            email: user.email,
            username: user.displayName || '',
            walletAddress: '',
            createdAt: new Date,
            balance: 0
        });
     }
 }
 //call createUserIfNOtExists after user log in