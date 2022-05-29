import React from 'react'
import {NavLink} from 'react-router-dom'
import ConnectWallet from './ConnectWallet'
import './../styles/styles.scss'
import { 
  Box,
  HStack,
  Flex,
  Spacer,
  Heading
} from '@chakra-ui/react'



const Navigation = ({ currentAccount, setCurrentAccount, isMetaMask}) => {
  return (
    <nav className="navigation">
      <Flex>
        <Heading as='h3' size='lg' noOfLines={1}>👋 WavePortal</Heading>
        <Spacer/>
        <HStack className="nav-links" spacing={6}>
          <NavLink className="text-Medium" to="/">Home</NavLink>
          <NavLink className="text-Medium" to="/player">Player</NavLink>
          <Box ml={12}>
            <ConnectWallet currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} isMetaMask={isMetaMask} />
          </Box>
        </HStack>
      </Flex>
    </nav>
  )
}

export default Navigation