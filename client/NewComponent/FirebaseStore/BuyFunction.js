import { useEffect, useState } from "react";
import {ethers} from 'ethers';
import { db } from "./Firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import contractABI from '';
import { Timestamp } from "mongodb";

const contractAddress = '';
const NFT_address = '';
 export const BUYNFT = ({tokenId, sellerAdrress, price}) => {
    const [txStatus, setTxStatus] = useState(null);
     const handleBUy = async () => {
        try{
            if (!window.ethereum) throw Error('Metamask not detected');
            const provider = new ethers.providers.web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
             const tx  = await contract.BUYNFT(NFT_address, tokenId, sellerAdrress, {
                value: ethers.utils.parseEther(price)
            });
            setTxStatus('pending...');
            // const receipt  await tx.wait();
             setTxStatus('Success');

             // parse event from logs
             const event = receipt.events.find(e => e.event === 'NFTPurchased');
                const {buyer, seller, tokenId, amount, commission} = event.logs;
                
                await setDoc(doc(db, 'transaction', tx,hash), {
                    txHash: tx.hash,
                    buyer,
                    seller,
                    tokenId : IdleDeadline.toString(),
                    amount: ethers.utils.parseEther(amount),
                    commission: ethers.utils.parseEther(commission),
                    Timestamp: new Date().toISOString()
                })
             

        } catch (err) {
            console.log(err);
            setTxStatus('Error:' + err.message)
        }
     };
     return (
        <div>
            <button onClick={handleBUy}> Buy NFT</button>
            <p>{txStatus}</p>
        </div>
     )
 }

    // display transaction logs
   const TransactionLog = () => {
    const [transaction , setTransaction] = useState([]);
    useEffect(()=> {
        const fetchTxs = async () => {
            const snapshot = await getDoc(collection(db, 'transaction'));
            const data = snapshot.docs.map(doc => doc.data());
            setTransaction(data);
        };
        fetchTxs();
    }, [])
   }