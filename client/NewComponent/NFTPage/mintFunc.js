import {ethers} from "ethers";
import { getProvider } from "./getProvider";
import { estimatedGas } from "./estimateGas";
import { logToDatabase, logRejectToBackend, updateToDatabase } from "../eventHelper/listenerEvent";
import { v4 as uuidv4} from "uuid"

export const mintNFT = async ( tokenURI, minting, nftAddress, marketAddress, 
  UIstatus, id, username, exhibitionId) => {

  //  const mintFee = ethers.parseEther(price.toString());
    console.log('NFT_ADDRESS:', nftAddress)
  
  const { gasWithBuffer, totalCost, ethBalance, nftContract, ownerAddress,
     address, mintFee} = await estimatedGas(tokenURI, nftAddress, marketAddress);
      
       if (address !== ownerAddress) {
          console.log('MINTFEE:', mintFee)
       console.log('Typeof_MintFee:', typeof mintFee)
       console.log('ETH_MINTFEE:', ethers.formatEther(mintFee))
       }
       const currentAddress = address;
      
       console.log('CURRENT_ACCOUNT:', currentAddress);
      console.log('Owner_Address:', ownerAddress)
       if (ethBalance < totalCost) {
         return;
       };
       let txRecord;
        // if (exhibitionId > 0) {
        //   const hasJoined = await checkExhibitionMembership(exhibitionId, currentAddress);
        //   if (!hasJoined) {
        //     throw new Error('User must join exhibition first');
        //   }

        //  txRecord = await logExhibitionMint(
        //       status: 'pending', nftAddress, currentAddress, type: 'mint',
        //    amount: address !== ownerAddress ? (mintFee.toString() || null) : null,
        //   exhibitionId, date: new Date().toISOString()
        //  })
        // }
        txRecord = await logToDatabase({
          status: 'pending', nftAddress, currentAddress, type: 'mint',
           amount: address !== ownerAddress ? (mintFee.toString() || null) : null,
          date: new Date().toISOString()
         });
       UIstatus = 'Preparing transaction';
       console.log('Preparing...');
       console.log('TX_RECORD:', txRecord)
 try{
   UIstatus = 'Please confirm the transaction in your wallet';
   console.log('Confirming wallet...')
   minting === true;
   let tx;
   if ( currentAddress !== ownerAddress) {
      tx = await nftContract.mintNFT(tokenURI, { gasLimit: gasWithBuffer, value: mintFee});
   } else {
       tx = await nftContract.ownerMint( currentAddress, tokenURI, {gasLimit: gasWithBuffer});
   }
     const txHash = tx.hash;
   
    console.log('Transaction:', tx);
   UIstatus = 'Transaction Pending...(Awaiting network confirmation)';
   console.log('Pending...')
      console.log('Tx-Record_id:', txRecord._id);

      const updatedTx = await updateToDatabase(txRecord._id, {
        txHash,
        nftAddress: nftAddress,
         status: 'pending', 
         date: new Date().toISOString()
      }); 
          UIstatus = 'Confirming';
          console.log('Confirming transaction...');
    await tx.wait();
    UIstatus = 'Success! Mint completed and logged'
    console.log('Success...')
    alert('MInted successfully');
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
          type: 'mint',
          status: 'rejected',
          mintFee,
          errorMessage,
          rejectType
        })      
    // if (err.reason) {
    //   console.error(`Minting failed: ${err.reason}`);
    // } else if (err.message.includes('Transaction will fail')) {
    //   console.error(err.message);
    // } else {
    //   console.error('Minting failed, Please try again.', err)
    // }
 } finally {
    minting === false;
 }
}