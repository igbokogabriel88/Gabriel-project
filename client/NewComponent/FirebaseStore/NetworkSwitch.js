import { symbol } from "prop-types";

export const GoerliNetwork = async () => {
     const {ethereum} = window;
     if (!ethereum) return alert('Metamask not found');
     const chainId = await ethereum.request({method: 'eth_chainId'});
     if (chainId != '0x5'){
        alert('Please switch to the Goerli network in Metamask');
     }
}

export const NetworkPrompt = async () => {
    const {ethereum} = window;
     if (!ethereum) return alert('Metamask not found');
     try{
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: '0x5'}]
         })
     } catch (err) {
        if (err === ''){
            await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x5',
                    chainName: 'Goerli TYest Network',
                    rpcurls: ['https://rpc.ankr.com/eth_goerli'],
                    nativeCurrency: {
                        name: 'Goerli ETH',
                        symbol: 'ETH',
                        decimals: 18
                    },
                    blockExplorerUrls: ['https://goerli.etherscan.io'] 
            }]
            })
        }
     }
     
} 