import React, {useEffect, useState} from "react";
import { fetchData } from "../helperFunc";
import { getProvider } from "../NFTPage/getProvider";
import { useSelector, useDispatch } from "react-redux";
import { approveToDatabase, listToDatabase, updateApprovalToDatabase, updateToDatabase}
 from "../NFTPage/helperFunc";
 import { NftCard } from "./NftCard";
 import { logRejectToBackend } from "../eventHelper/listenerEvent";
 import './Icons.css'

export const MyListing = () => {
 const [address, setAddress] = useState(null);
 const [nftContract, setNftContract] = useState(null);
 const [marketContract, setMarketContract] = useState(null);
 const [isListing, setIsListing] = useState(false);
 const [price, setPrice] = useState(null)

    const nfts = useSelector(state => state.fetchData);
      // console.log('LIST_NFT:', nfts);
    // console.log('LIST_ADDRESS:', address);
    // console.log('NFT_CONTRACT:', nftContract);
    // console.log('MARKET_CONTRACT:', marketContract)
    const mappedNFT = nfts?.map(item => item?.nft);
    const filteredData = mappedNFT?.filter( nft => nft?.currentOwner === address && nft?.isListed === false); 
     const walletAddress = useSelector(state => state.fetchWallet);
     const nftUser = useSelector(state => state.fetchNftUser);
     const userWallet = nftUser?.data?.walletAddress;

     const nftAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
    const marketAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;
     const dispatch = useDispatch();
     
     const loadImage = (ipfsUrl) => {
        let imageHash;
        if ( ipfsUrl.startsWith('ipfs://')) {
            imageHash = ipfsUrl.replace('ipfs://', '')
        }
        if (ipfsUrl.startsWith('Qm')) {
            imageHash = ipfsUrl;
        }
        imageHash = `https://ipfs.io/ipfs/${imageHash}`;
        console.log('Image_Hash:', imageHash)
        return imageHash
    }
     const handleListing = async ( tokenId, price, nftAdress) => {
      console.log('DATA:', tokenId, price, nftAddress);
      let txRecord;
      txRecord = await approveToDatabase({
          status: 'pending',
          nftAddress,
          address,
          type: 'approval',
          date: new Date().toISOString()
         },dispatch);
       console.log('TX_RECORD:', txRecord)
       const record = txRecord?.transaction._id;
   console.log('RECORD:', record)
 try{
   UIstatus = 'Please confirm the transaction in your wallet';
   console.log('Confirming wallet...')
   
   let tx;
    tx = await nftContract.approve( marketContract, tokenId);
     const txHash = tx.hash;
   
    console.log('Approval Transaction:', tx);
   UIstatus = 'Transaction Pending...(Awaiting network confirmation)';
   console.log('Pending...')

      const updatedTx = await updateApprovalToDatabase(record, {
        txHash,
        nftAddress: nftAddress,
         status: 'pending', 
         date: new Date().toISOString()
      }, dispatch); 
          UIstatus = 'Confirming';
          console.log('Confirming approval transaction...');

    await tx.wait();
    UIstatus = 'Success! Approval completed and logged'
    console.log('Success...')
    alert('NFT approved successfully');
    // UIstatus = 'Please confirm in wallet...'
 } catch (err) {
        let satus = 'failed';
        console.log('Failed tx:', err.reason || err.message )
        let rejectType = 'other';
        let errorMessage = err.reason || err.message;
        let txHash = err.transactionHash || null;

        if (err.code === 4001) {
          UIstatus = 'Transaction rejected by user';
          rejectType: 'user-reject';
          errorMessage = 'User rejected the transaction in Metamask';
          txHash_UUID = `rejected_${uuidv4()}`;
          console.log('ERROR_TXHASH_ID:', txHash_UUID);
          txHash = err.transactionHash ? err.transactionHash : txHash_UUID; 
        } else if ( err.code === -32603) {
          UIstatus = `Transaction failed! network-error`; 
          rejectType = 'network-error';
          errorMessage = 'Network error occurred'
        } else if (err.message.includes('gas')) {
          UIstatus = 'Transaction failed! wallet-error';
          rejectType: 'wallet-error';
          errorMessage = 'Gas estimation failed';
        }
        
        await logRejectToBackend({
                  txHash,
                  address,
                  type: 'approval',
                  status: 'rejected',
                  errorMessage,
                  rejectType
                }, dispatch)       
 } 

//          txRecord = await listToDatabase({
//           status: 'pending',
//           nftAddress,
//           address,
//           type: 'list',
//           date: new Date().toISOString()
//          }, dispatch);
//        console.log('TX_RECORD:', txRecord)
//  try{
//    UIstatus = 'Please confirm the transaction in your wallet';
//    console.log('Confirming wallet...')
//    setIsListing(true);
//    let tx;
//     tx = await marketContract.listNFT( nftAddress1, tokenId, price);

//      const txHash = tx.hash;
   
//     console.log('Listing Transaction:', tx);
//    UIstatus = 'Transaction Pending...(Awaiting network confirmation)';
//    console.log('Pending...')
//       console.log('Tx-Record_id:', txRecord._id);

//       const updatedTx = await updateListToDatabase(txRecord._id, {
//         txHash,
//         nftAddress: nftAddress1,
//          status: 'pending', 
//          date: new Date().toISOString()
//       }, dispatch); 
//           UIstatus = 'Confirming';
//           console.log('Confirming transaction...');
//     await tx.wait();
//     UIstatus = 'Success! List completed and logged'
//     console.log('Success...')
//     alert('NFT listed successfully');
//     // UIstatus = 'Please confirm in wallet...'
//  } catch (err) {
//         let satus = 'failed';
//         console.log('Failed tx:', err.reason || err.message )
//         let rejectType = 'other';
//         let errorMessage = err.reason || err.message;
//         let txHash = err.transactionHash || null;

//         if (err.code === 4001) {
//           UIstatus = 'Transaction rejected by user';
//           rejectType: 'user-reject';
//           errorMessage = 'User rejected the transaction in Metamask';
//           txHash_UUID = `rejected_${uuidv4()}`;
//           console.log('ERROR_TXHASH_ID:', txHash_UUID);
//           txHash = err.transactionHash ? err.transactionHash : txHash_UUID; 
//         } else if ( err.code === -32603) {
//           UIstatus = `Transaction failed! network-error`; 
//           rejectType = 'network-error';
//           errorMessage = 'Network error occurred'
//         } else if (err.message.includes('gas')) {
//           UIstatus = 'Transaction failed! wallet-error';
//           rejectType: 'wallet-error';
//           errorMessage = 'Gas estimation failed';
//         }
//         await logListRejectToBackend({
//           txHash,
//           address,
//           type: 'list',
//           status: 'rejected',
//           errorMessage,
//           rejectType
//         }, dispatch)      
    
//  } finally {
//     setIsListing(false)
//  }
     }

     
    useEffect(() => {
        fetchData(dispatch)
    },[]);

      useEffect(() => {
        const initiate = async () => {
            const {nftContract, marketPlaceContract} = await getProvider(nftAddress, marketAddress);
           setNftContract(nftContract);
           setMarketContract(marketPlaceContract)
        }
        initiate();
    },[])

    useEffect(() => {
        const nftLower = userWallet?.map(addr => addr?.toLowerCase());
        const walletLower = walletAddress?.toLowerCase();
        if (nftLower?.includes(walletLower)) {
          setAddress(walletAddress)
        } else {
          setAddress(null)
        }
      },[userWallet, walletAddress])

       console.log('NFT_DATA:', filteredData)
    
    return (
        <div className="nftListing"> NFT LISTING
        <div className="listing-wrapper">
            <div>{filteredData?.map(nft => (
              <NftCard key={nft?._id} 
              item={nft}
              loadImage={(value) => loadImage(value)}
              handleListing={(value) => handleListing(value)}
              />
            ))}</div>
        </div>
    </div>
    )
  }