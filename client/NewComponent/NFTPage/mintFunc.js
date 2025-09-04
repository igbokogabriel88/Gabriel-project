import {ethers} from "ethers";
import { getContract } from "./contract";
import { estimatedGas } from "./estimateGas";

export const mintNFT = async ( tokenURI, price, minting, nftAddress, marketAddress) => {

   const mintFee = ethers.parseEther(price);
   console.log('MINTFEE:', mintFee)
 const {nftContract, ethBalance, signer} = await getContract(nftAddress, marketAddress);

      const { gasWithBuffer, totalCost} = await estimatedGas(tokenURI, price, nftAddress, marketAddress);
       if (ethBalance < totalCost) {
         return;
       }
 try{
   minting === true;
   const tx = await nftContract.mintNFT(tokenURl,{ gasLimit: gasWithBuffer, value: mintFee });
    await tx.wait();
    alert('MInted successfully')
 } catch (err) {
    alert('Mint failed');
    if (err.reason) {
      alert(`Minting failed: ${err.reason}`);
    } else if (err.message.includes('Transaction will fail')) {
      alert(err.message);
    } else {
      alert('Minting failed, Please try again.')
    }
 } finally {
    minting === false;
 }
}