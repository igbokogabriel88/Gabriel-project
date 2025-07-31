import { ether } from 'ethers';
// import (nftContract, marketplaceContract) from './contracts';

 const handleListNFT = async () => {
    setLoading(true);
    try{
    //     const approvalTx = await nftContract.approve(marketplaceAddress, tokenId);
    // await approvalTx.wait();

    // const listingTx = await marketplaceContract.listNFT(
    //     NFT_Address, tokenId, ethers.utils.parseEther(price)
    // );
    //await listingTx.wait();

    await nftContract.approve(marketplaceAddress, tokenId);
    await marketplaceContract.listNFT(
          NFT_Address, tokenId, ethers.utils.parseEther(price)
         );
    

    console.log('NFT listed successfully')
    } catch (err) {
        console.error(err);
        faArrowLeftRotate('LIsted failed')
    }
    
} 
// render it in a button