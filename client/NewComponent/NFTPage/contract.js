import {ethers} from "ethers";
import marketplaceABI from '../../src/contracts/Marketplace.json';
import nftABI from '../../src/contracts/NFT.json';

// const nftAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
// const marketplaceAddress = import.meta.env.VITE_NFT_MARKETPLACE_ADDRESS;

export const getContract = async (nftAddress, marketplaceAddress) => {
    if (!window.ethereum) {
        return;
    }
    //   const provider = new ethers.providers.web3Provider(window.ethereum);
    const provider = new ethers.BrowserProvider(window.ethereum);
       const signer = await provider.getSigner();
       const address = await signer.getAddress();
       const ethBalance = await provider.getBalance(address);

       const nftContract =  new ethers.Contract(nftAddress, nftABI.abi, signer);

       const marketPlaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI.abi, signer);
       console.log('ETH_BALANCE & WALLET_ADDRESS:', ethBalance)

       return {nftContract, marketPlaceContract, ethBalance, signer, provider};
}