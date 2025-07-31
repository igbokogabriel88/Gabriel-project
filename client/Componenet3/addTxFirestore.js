import {doc, setDoc, GetDoc} from 'firebase/firestore';
import {auth, db} from './firebase'
 export const logTransaction = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, 'transaction'), {
        txhash,
        amount,
        userId: user.uid,
        createdAt: new Date()
    });
 };