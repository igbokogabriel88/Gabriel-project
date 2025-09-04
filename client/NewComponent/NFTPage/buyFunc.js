 import {ethers} from "ethers";
 export const BuyFunction = async (tokenId, price, walletAddress, contractAddress, abi) => {
    let buying = false;
     if (!window.ethereum || !walletAddress) return ;
   
     try{
        buying = true;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
         const contract = new ethers.Contract(contractAddress, abi, signer);

         const tx = await contract.buyNFT(tokenId, { value: ethers.parseEther(price)});
          await tx.wait();
          alert('5Purchase successful');
     } catch (err) {
        console.error('Buy error:', err);
        alert('Transaction failed');
     } finally {
        buying = false;
     }
      return buying
 }