import {ethers} from 'ethers';
const provider = new ethers.providers.web3Provider(window.ethereum);
const signer = provider.getSigner();

const mintPrice = ethers.untils.parseEther("0.01");
 try{
    await Contract.callStatic.mint({
        value: mintPrice,
        gasLimit: 100000,
        pasPrice: ethers.utils.parseUnits("1", "gwei")
    });
     const tx =  await Contract.mint({
        value: mintPrice,
        gasLimit: 100000,
        pasPrice: ethers.utils.parseUnits("1", "gwei")
    });

    console.log('MInting transaction sent:', tx.hash);
    await tx.wait();
    console.log('Mint successful!');
 } catch (error) {
    console.error('Mint falied or simulataed call failed:', error)
 }