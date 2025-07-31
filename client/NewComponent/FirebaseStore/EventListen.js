import {ethers} from 'ethers'

const EventTransfer = () => {
    const provider = new ethers.providers.WebsocketProvider(
        `wss://eth-sepolia.g.alchemy.com/v2/YOUR_API_HEY`
    );
    const contractAddress = 'contractAddress';
    const ABI = ["event Transfer(address indexed from, indexed to, unit256 value)" //for ERC-20
       // "event Transfer(address indexed from, indexed to, unit256 value)" for ERC-721
    ];
     const contract = new ethers.Contract(contractAddress, ABI, provider);
     contract.on('Transfer', (from, to, value, event));
     console.log(`Transfer from ${from} to ${to} of ${value.toString()}`);
     console.log("Event details:", event) 
}