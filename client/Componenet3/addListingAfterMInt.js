import {doc, setDoc, GetDoc} from 'firebase/firestore';
import {auth, db} from './firebase'
 export const mintNFTMetadata = async (nftData) => {
    const user = auth.currentUser;
    if(user) return;

    await addDoc(collection(db, 'nfts'), {
        ...nftdata,
        ownerId: user.user.uid,
        createdAt: new Date()
    });
 };