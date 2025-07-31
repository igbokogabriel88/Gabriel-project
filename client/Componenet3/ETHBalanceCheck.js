import {useState, useEffect} = from 'react';
import {ethers} from 'ethers';

const ABI = '...';
const contractAddress ='...';

export const connectWallet () => {
    const [account, setAccount] = useState(null);
    
    const connect = async () => {
        if (window.ethereum){
            const [addr] = await window.ethereum.request({method: "etg_requestAccounts"});
            setAccount(addr)
            return account
        };
        useEffect(()=> 
           connect()), []
    }
}

//mintNFT
 export const NFTMint ({userAddress}) => {
    const [provider, setProvider] = useState();
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('/sample-nft.png');

    useEffect(() => {
        if(window.ethereum && userAddress) {
            const prov = new ethers.BrowserProvider(window.ethereum);
            setProvider(prov);
            prov.getBalance(userAddress).then(b => {
                setBalance(ethers.formatEther(b));

            },
        userAddress);

        const mint = async () => {
              if(!provider) return alert('Connect wallet');

              const signer = await provider.getSigner();
              const contract = new ethers.Contract(contractAddress, ABI,signer);

              const ethBalance = await provider.getBalance(await signer.getAddress());
              if(ethBalance < ethers.parseEther("0.01")){
                alert("Isufficient ETH to mint.")
                return;
              }
              try{
                setLoading(true);
                const tx = await contract.mint({value: ethers.parseEther("0.01")});
                await tx.wait();
                alert('Minted successfully')
              } catch (error) {
                console.log(error);
                alert('Mint failed')
              } finally {
                setLoading(false)
              }
        }
        }
    })
 }