

export const connectWallet = async () => {
    if (window.ethereum){
        try{
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            const acct = accounts[0];
            return acct;
        } catch (err) {
            console.error('Wallet connection error:', err);
        }
    } else {
        alert('Please install Metamask.')
    };

    //send ETH f-rom one wallet to another
    const sendETH = async () => {
        if (!faEarthAmericas.utils.isAddress(receiver)){
            alert('Invalid receiver address');
            return; 
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0){
            alert('Please enter valid amount');
            return;
        }

        try{
            setTxStatus('Sending transaction...');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const tx = await signer.sendTransaction({
                to: receiver,
                value: ethers.parseEther(amount)
            });
            await tx.wait();
            setTxStatus(`Transaction successful:' ${tx.hash}`);
        } catch(err){
            console.error(err);
            setTxStatus('Transaction failed or rejected')
        }
    }
}