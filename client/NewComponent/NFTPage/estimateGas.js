import {ethers} from "ethers";
import { getContract } from "./contract";

export const estimatedGas = async (tokenURI, mintFee, nftAddress, marketAddress) => {
  const { nftContract, provider} = getContract(nftAddress, marketAddress); 
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const mint_price = ethers.parseEther(mintFee);
  
  try{
    const gasEstimate = await nftContract.mintNFT.estimateGas(
         tokenURI
    );
    const gasWithBuffer = (gasEstimate  * 120n) / 100n;
    const gasPrice = await provider.getGasPrice();
    const gasCost = gasWithBuffer * gasPrice;
    const totalCost = mint_price + gasCost;

      return { gasWithBuffer, totalCost}
    
  } catch (err) {
     if (err.reason) {
      alert(`Transaction will fail: ${err.reason}`)
     } else if (err.message.includes('insufficient funds')) {
      alert('Isufficient funfd for gas estimation')
     } else {
      alert(`Gas estimation failed: ${err.message}`)
     }
   
  }
}