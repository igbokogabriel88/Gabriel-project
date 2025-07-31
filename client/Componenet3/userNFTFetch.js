import {doc, collection, query, where, GetDocs} from 'firebase/firestore';
import {auth, db} from './firebase'

export const fetchUserNFTS = async (userId) => {
    const q = query(collection(db, 'nfts'), where('owerId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

}
