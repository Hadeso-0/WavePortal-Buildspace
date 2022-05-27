import React from 'react'
import {NavLink} from 'react-router-dom'
import ConnectWallet from './ConnectWallet'
import './../styles/styles.scss'

import { Heading } from '@chakra-ui/react'


const Navigation = ({ currentAccount, setCurrentAccount, isMetaMask}) => {
  return (
    <nav className="navigation">
      <Heading as='h3' size='lg' noOfLines={1}>👋 WavePortal</Heading>
      <div className="nav-links">
        <NavLink className="text-Medium" to="/">Home</NavLink>
        <NavLink className="text-Medium" to="/player">Player</NavLink>
        <ConnectWallet currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} isMetaMask={isMetaMask} />
      </div>
    </nav>
  )
}

export default Navigation