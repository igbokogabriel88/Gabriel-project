import React from "react";
import { ethers } from "ethers"
import { setWalletAddress, clearWalletAddress } from "../Redux/Action/Action";

const chainIdNetwork = async (value) => {
        try{
            const chainId = await window.ethereum.request({method: "erg_chainId"});
            if (chainId != value){
                console.log('SWITCHING TO SEPOLIA...');
                try{
                    await window.ethereum.request({
                        method: "Wallet_switchEthereumChain",
                        params: [{chainId: value}]
                    });
                    console.log("SWitched to this network")
                } catch (switchError) {
                    if(switchError.code === 4902){
                        try{
                            await window.ethereum.request({
                                method: "Wallet_addEthereumChain",
                                params: [
                                {
                                    chainId: value,
                                    chainName: "Ethereum Mainnet",
                                    nativeCurrency: {
                                        name: "Ether",
                                        symbol: "ETH",
                                        decimals: 18
                                    },
                                    rpcUrls: ["https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
                                    blockExplorerUrls: ["https://etherscan.io/"] 
                                },
                                ],
                            });
                        } catch (addError) {
                            console.error('Failed to add Mainnet network', addError)
                        }
                    }  else { 
                        console.error('Failed to switch Network:', switchError)
                    }
                } 
                } else {
                    console.log('Already on Sepolia');
                }
            } catch (error) {
                console.error("Error checking or switching network:", error)
            }     
      }
   

export const connectWallet = async (dispatch) => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const directProvider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
        await directProvider.getBlockNumber();
        console.log('connected directl to hardhat');
        const accounts = await directProvider.listAccounts();
        console.log('GLOBAL_ACCOUNT:', accounts)
        const signer = await directProvider.getSigner(accounts[5].address);
        console.log('SIGNER_LOCAL:', signer)
        const address = await signer.address;
        console.log('ADDRESS_LOCAL:', address)
        dispatch(setWalletAddress(address));
    } else if (!window.ethereum){
        throw new Error('MetaMask is not installed');
        console.error('METAMASK IS NOT INSTALLED')
    } else {
       try{
        console.log('METAMASK IS INSTALLED')
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        const account = accounts[0];
     
        dispatch(setWalletAddress(account));
        console.log('METAMASK ACCOUNT')
    }   
    // return account
     catch (err) {
        throw new Error(err.message || 'Failed to connect wallet')
    }
    }
}        
    
        if (window.location.hostname !== 'localhost' && typeof window.ethereum !== 'undefined' && window.ethreum.on) {
             window.ethereum.on("accountsChanged", (newAccounts) => {
            if (newAccounts.length > 0){
                console.log('ACCOUNT_CHANGED:', newAccounts[0]);
                dispatch(setWalletAddress(newAccounts[0]))
            } else {
                console.log('WALLET DISCONNECTED');
                dispatch(clearWalletAddress());
            }
        });

        window.ethereum.on("chainChanged", () => {
          console.log('NETWORK_CHANGED:', chainId);
          const targetChainId = '0x1'
                chainIdNetwork(targetChainId)
        });
        } else {
            console.warn('Ethereum wallet not available')
        }
        
    