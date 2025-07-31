  
  export const estmateGas = async () => {
    if (!contract || !signer) return;
     const gasEstimate = await contract.setimateGas.mint({value: minPrice});
     const gasPrice = await provider.getGasPrice();
     const totalFee = gasEstimate.mul(gasPrice);
     setEstmateGas(ethers.utils.formatEther(totalFee))
  }