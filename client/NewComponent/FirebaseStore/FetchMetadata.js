import {doc, getDoc} from "firebase/firestore"

export const fetchMetaDataFromContract = async (tokenId) => {
    const tokenURL = await faFileContract.tokenURL(tokenId);
    const response = await fetch(tokenURL);
    const metadata = await response.json();
    return metadata.url
}

export const fetchMetaDataFromFirestore = async (tokenId) => {
const docRef = doc(db, 'nfts', tokenId.toString());
const snapshot = await getDoc(docRef);
return snapshot.exists() ? snapshot.data() : null;
}

// import these two above to another component and do this below
 let metadata = await fetchMetaDataFromContract(tokenId);
  if (!metadata || !metadata.image){
    metadata = await fetchMetaDataFromFirestore(tokenId);
  }