import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Fortmatic from "fortmatic";
import Button from 'react-bootstrap/Button';
import { useWeb3InfoDispatchContext } from "../contexts/Web3Context";
import { getChainIdToDisplay } from "../utils/provider";



const INFURA_ID = process.env.REACT_APP_INFURA_ID
const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
   
// Example for Polygon/Matic:
const customNetworkOptions = {
    rpcUrl: 'https://rpc-mainnet.maticvigil.com',
    chainId: 137
}


const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        INFURA_ID // required
      }
    },
    torus: {
        package: Torus, // required
        
    },
    fortmatic: {
        package: Fortmatic, // required
        options: {
          key: FORTMATIC_KEY, // required
          network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
        }
    }

};


const web3Modal = new Web3Modal({
    network: "goerli", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });



const showWalletAddress = (walletAddress) => {
    if(!walletAddress) return walletAddress;

    return walletAddress.substring(0, 4) + "..." + walletAddress.substring(walletAddress.length-4, walletAddress.length);    
}


const Web3Connect = () => {

    const [ isConnected, setIsConnected ] = useState(false)

    const [ networkName, setNetworkName ] = useState('')

    const [ walletAddress, setWalletAddress ] = useState(null)

    const setWeb3ProviderInfo = useWeb3InfoDispatchContext();

    const connectWallet = async () => {
        if (isConnected) return;
        const instance = await web3Modal.connect();

        // Subscribe to accounts change
        instance.on("accountsChanged", (accounts) => {
            if (accounts.length===0){
                setIsConnected(false);
            }
        });
        
        // Subscribe to chainId change
        instance.on("chainChanged", (chainId) => {
            
            setNetworkName(getChainIdToDisplay(ethers.BigNumber.from(chainId).toNumber()))
        });
        
        // Subscribe to provider connection
        instance.on("connect", (info) => {
            console.log("connect", info);
        });
        
        // Subscribe to provider disconnection
        instance.on("disconnect", (error) => {
            setIsConnected(false);
        });
        const web3Provider = new ethers.providers.Web3Provider( instance );
        
        const [account] = await web3Provider.listAccounts();

        if (account){
            setWalletAddress(account);
            setWeb3ProviderInfo({provider: web3Provider, wallet: account, active: true})
            const networkInfo = await web3Provider.getNetwork();
            setNetworkName(getChainIdToDisplay(networkInfo?.chainId))
            setIsConnected(true);
        }
    }

    useEffect(() => {
        if (web3Modal.cachedProvider) {
          connectWallet();
        }
      }, []);

    return (
<div>
    <Button onClick={connectWallet} variant=""  className={(!isConnected&& "btn-secondary-wnft") ||"btn-connected-wnft"}>
        {(!isConnected && "Connect" ) || (showWalletAddress(walletAddress) + " " + networkName) }
    </Button> 
    
</div>
    )
}

export default Web3Connect;