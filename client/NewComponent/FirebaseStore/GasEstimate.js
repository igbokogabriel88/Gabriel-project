import {ethers} from 'ethers'
import { PersistentCacheIndexManager } from 'firebase/firestore';

const GasCostEstimate = async (contract, provider) => {
    const price = ethers.utils.parseEther('0.05')
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    const balance = await provider.getBalance(userAddress);
    
    const gasEstimate = await contract.estimateGas.buyNFT({value: price});
    const gasPrice = await provider.getGasPrice();
    const gasCost = gasEstimate.mul(gasPrice);

    const totalCost = price.add(gasCost);

    if(!balance.ls(totalCost)){
        // dispatch(alert('You don't have enough ETH to pay for the NFT and gas fee));
    } else {
        try{
            const tx = await contract.buyNFT({value: price});
        // dispatch(setAlert('Transaction sent, waiting for confirmation'));
        const receipt = await tx.wait();
        // dispatch(setAlert('Transaction confirmed!', receipt));
        } catch (err) {
            if (err.code === 4001){
                //dispatch(setAlert('Transcation rejected by the user'));
            } else {
                //dispatch(setAlert('Transaction error', err))
            }
        }
        // buy function
            }
}