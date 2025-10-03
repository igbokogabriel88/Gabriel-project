import {ethers} from "ethers";
import { getProvider } from "./getProvider";

export const estimatedGas = async (tokenURI, nftAddress, marketAddress) => {
  const {nftContract, marketPlaceContract, walletContract, ethBalance, signer, address,
     provider} = await getProvider(nftAddress, marketAddress);
     const ownerAddress = await walletContract.owner();
     const mintFee = await walletContract.getMintFee();
   
     console.log('GET_MINT_FEE:', ethers.formatEther(mintFee));
     console.log('Mint_Fee:', mintFee);
     
     console.log('WalletAddress:', ownerAddress);
     console.log('CurrentAddress:', address)
    
  // console.log('TYPEOF_MINTFEE:', typeof mintFee);
//   const mintPrice = ethers.parseEther(mintFee.toString());
  // console.log('MINT_PRICE:', mint_price)
   if ( address === ownerAddress) {
       try{
    const gasEstimate = await nftContract.ownerMint.estimateGas(
         address, tokenURI
    );
    console.log('GAS_ESTIMATE:', gasEstimate)
    const gasWithBuffer = (gasEstimate  * 120n) / 100n;
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    // console.log('FEE_DATA:', feeData);
    // console.log('GAS_PRICE:', gasPrice);
   console.log('GAS_WITH_BUFFER:', gasWithBuffer)
   // const gasPrice = await provider.getGasPrice();
    const gasCost = gasWithBuffer * gasPrice;
    const totalCost = gasCost;
     console.log('TOTAL_COST:', totalCost);
     console.log('GAS_COST:', gasCost)

      return { gasWithBuffer, totalCost, ethBalance, nftContract, ownerAddress, address}
    
  } catch (err) {
     if (err.reason) {
      console.error(`Transaction will fail: ${err.reason}`)
     } else if (err.message.includes('insufficient funds')) {
      console.error('Isufficient fund for gas estimation')
     } else {
      alert(`Gas estimation failed: ${err.message}`)
     }
  }
   } else {
    try{
    const gasEstimate = await nftContract.mintNFT.estimateGas(
         tokenURI, { value: mintFee}
    );
    console.log('GAS_ESTIMATE:', gasEstimate)
    const gasWithBuffer = (gasEstimate  * 120n) / 100n;
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    // console.log('FEE_DATA:', feeData);
     console.log('GAS_PRICE:', gasPrice);
   console.log('GAS_WITH_BUFFER:', gasWithBuffer)
   // const gasPrice = await provider.getGasPrice();
    const gasCost = gasWithBuffer * gasPrice;
    const totalCost = mintFee + gasCost;
     console.log('TOTAL_COST:', totalCost);
     console.log('GAS_COST:', gasCost)

      return { gasWithBuffer, totalCost, ethBalance, nftContract, ownerAddress, address, mintFee }
    
  } catch (err) {
     if (err.reason) {
      console.error(`Transaction will fail: ${err.reason}`)
     } else if (err.message.includes('insufficient funds')) {
      console.error('Isufficient fund for gas estimation')
     } else {
      alert(`Gas estimation failed: ${err.message}`)
     }
   
  }
   }
  
}