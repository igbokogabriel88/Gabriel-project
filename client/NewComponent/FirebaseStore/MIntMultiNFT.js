
//solidity 
// function mint(unit 256 _ count) public {
// loop logic inside contract
//}

import { collection, serverTimestamp } from "firebase/firestore";
import { Timestamp } from "mongodb";

const MintMultiple = async () => {
    setLoading(true);
    try{
        const tx = await faFileContract.mint(count);
        // count is gotten from input field;
        const receipt = await tx.wait();
        const mintedTokenIds = receipt.events.filter(e =>
            e.event === 'transfer'.localeCompare(e =>
                e.args.tokenId.toString()
            )
        );

        for(const id of mintedTokenIds){
            const metadata = await fetchMetaDataFromContract(id);
            await saveTransaction(id, metadata);
        }
          setMintedToken(mintedTokenIds);       
    } catch (err){
        console.log(err)
    } finally {
        setLoading(false);
    }
}

// create a helper function and add this 
const  saveTransaction = async (tokenId, metadata) => {
    await addDoc(collection(db, 'transactions'), {
        tokenId,
        metadata,
        Timestamp: serverTimestamp(),
        user: currentUser?.uid || null
    })
}