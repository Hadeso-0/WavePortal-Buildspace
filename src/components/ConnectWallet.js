import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from '@chakra-ui/react'
import { toast } from 'react-hot-toast';

const WalletConnect = ({ currentAccount, setCurrentAccount, isMetaMask}) => {

  const { ethereum } = window;
  // const provider = new ethers.providers.Web3Provider(ethereum)
  // // console.log(provider)

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0]);
       
      toast.success('Wallet connected successfully',
          {
            style: {
              borderRadius: '100px',
              background: '#333',
              color: '#fff',
            },
          }
        );

    } catch (error) {
      console.log(error)
    }
  }

  const switchWallet = async () => {
    
    const accounts = await ethereum.request({ method: "wallet_requestPermissions",
      params: [{eth_accounts: {}}]
    })
    .then(() => {
      ethereum.request({ method: 'eth_requestAccounts' })
      .then((data)=>{
        setCurrentAccount(data[0]);
        toast.success('Wallet connected successfully',
            {
              style: {
                borderRadius: '100px',
                background: '#333',
                color: '#fff',
              },
            }
          );
      })
    })
    .catch((error)=>{
      toast.error(`${error.message}`,
        {
          style: {
            borderRadius: '100px',
            background: '#333',
            color: '#fff',
          },
        }
      )
    })
  }

  const disconnectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      let accounts;
      isMetaMask 
      ? (
        switchWallet()
      ) 
      : (
        accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      )

    } catch (error) {
      console.log(error)
      toast.error(error,
        {
          style: {
            borderRadius: '100px',
            background: '#333',
            color: '#fff',
          },
        }
      )
    }
  }

  const displayAccount = (a) => {
      return `${a.slice(0,4)}...${a.slice(a.length-4)}`
  }

  return (
    <div className="walletBtn-Container">
    {
        !currentAccount?(
            <Button size='sm' className="waveButton" variant='outline' colorScheme='brand' onClick={connectWallet}>
              Connect Wallet
            </Button>
        ) 
        : (
            <Button size='sm' variant='solid' colorScheme='brand' className="waveButton" onClick={disconnectWallet}>
                {`${displayAccount(currentAccount)}`}
            </Button>
        )
    }
    </div>
  );
}

export default WalletConnect
