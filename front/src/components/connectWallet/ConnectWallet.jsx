import React, { useState, useEffect } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { Web3Provider } from '@ethersproject/providers'
import { useEthereumContext } from '../ethereumContext/EthereumContext'
import NetworkDisplay from './NetworkDisplay'

export default function ConnectWallet() {
  const { account, setAccount, provider, setProvider, signer, setSigner } =
    useEthereumContext()
  const [connected, setConnected] = useState(false)
  const [enable, setEnable] = useState(false)

  useEffect(() => {
    if (!connected && enable) connectToMetamask()
  }, [connected])

  const connectToMetamask = async () => {
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.')
      return
    }
    if (!window.ethereum.isMetaMask) {
      window.alert('Please install MetaMask.')
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const newProvider = new Web3Provider(window.ethereum)
      setProvider(newProvider)
      const newSigner = newProvider.getSigner()
      setSigner(newSigner)

      //if (window.ethereum.enable()) window.alert('Successful connection')

      setAccount(accounts[0])
      setConnected(true)
      setEnable(true)
    } catch (error) {
      window.alert('User denied account access.')
      console.log(error)
    }
  }
  const handleDisconnect = async () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setConnected(false)
    setEnable(false)
  }

  return (
    <Box>
      {!connected && (
        <Button onClick={connectToMetamask}>Connect to MetaMask</Button>
      )}
      {connected && (
        <>
          <Text color='white'>{account}</Text>
          <Button onClick={handleDisconnect}>Disconnect</Button>
          <NetworkDisplay />
        </>
      )}
    </Box>
  )
}
