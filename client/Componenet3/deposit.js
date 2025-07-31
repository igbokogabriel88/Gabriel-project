contract DepositManager {
    string public network = Ethereum;
    unit256 public minDeposit = 0.01 ether;
    
    function getNetwork() public view returns (string memory) {
        return network;
    }
    function getMinDeposit() public view returns (unit256){
        return minDeposit
    }
}

//fontend
import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers'
 import {contractABi} from './abi.json';
  
 const contractAddress = '...';
  
 export const DepositInfo = () => {
    const [network, setNetwork] = useState('');
    const [minDeosit, setMinDeposit] = useState('');

    useEffect(() => {
        const fetchDepositData = async () => {
            try{
                const provider = new ethers.providers.web3Provider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, contractABi, provider);

                const net = await contract.getNetwork();
                const min = await contract.getMinDeposit();

                setMinDeposit(min);
                setNetwork(net);
            } catch (error) {
                console.error('Error fetching deposit data:', error)6
            }
        };
        fetchDepositData();
    },[])
 }
