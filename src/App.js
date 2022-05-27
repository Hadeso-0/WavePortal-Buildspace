import React, {useState,useEffect} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ethers } from "ethers";
import { toast, Toaster} from 'react-hot-toast';
import TrackPortal from './utils/SongPortal.json';

import NavBar from "./components/navigation"
import Home from "./components/Home"
import Player from "./components/Player"
import NoMatch from "./components/NoMatch"


const App = () => {

  const [currentAccount,setCurrentAccount] = useState("");
  const [isMetaMask, setIsMetaMask] = useState(true);
  const [firstConnection, setFirstConnection] = useState(true)

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contractAddress = "0x279f3A7D39dcAF70083a6afceC4a0D1bCD86d8da";
  const TrackPortalContract = new ethers.Contract(contractAddress, TrackPortal.abi, signer)

  const getMetaMask = async () => {
    (provider.provider.providers && provider.provider.providers.length > 0)
    ? setIsMetaMask(provider.provider.selectedProvider===provider.provider.providers.find((({isMetaMask}) => isMetaMask))?true:false)
    : setIsMetaMask(true);
  }


  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        // console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        
        firstConnection &&
        toast.success('Wallet connected successfully',
          {
            style: {
              borderRadius: '100px',
              background: '#333',
              color: '#fff',
            },
          }
        );

        setFirstConnection(false)
      
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
      getMetaMask();
      checkIfWalletIsConnected();
  },[])

  return (
    <div className="App">
      <Toaster/>
      <Router>
        <NavBar currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} isMetaMask={isMetaMask} />
        <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  TrackPortalContract={TrackPortalContract} 
                  checkIfWalletIsConnected={checkIfWalletIsConnected}
                  currentAccount={currentAccount} 
                />
              } 
            />
            {/* <Route path="/" element={<Player/>} /> */}
            <Route path="/player" element={<Player/>}/>
            <Route path="*" element={<NoMatch/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
