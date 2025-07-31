
// RPC URLs
const AlchemySepolia = 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY'

const InfuraSepolia = 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID'

// Websocket

const Alchemy = 'wss://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY'

const Infura = 'wss://mainnet.infura.io/ws/v3/YOUR_PROJECT_ID';

// provider
const provider = new ethers.providers.web3Provider(window.ethereum);
   await provider.send('eth_requestAccounts', []);
   const signer = provider.getSigner();
   
   const contract = new ethers.Contract(contractAddress, ABI, signer);
   const tx = await contract.mintNFT({value: ethers.utils.parse.Ether('0.05')});
   const receipt = await tx.wait();
   console.log('Mint completed:'. receipt)