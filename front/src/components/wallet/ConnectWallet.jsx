import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { Box, Button, Text } from '@chakra-ui/react'
import { Web3Provider } from '@ethersproject/providers'

export default function ConnectWallet() {
  const [account, setAccount] = React.useState(null)
  const { chainId } = useWeb3React()

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
      const provider = new Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      window.alert(chainId)

      setAccount(accounts[0])
    } catch (error) {
      window.alert('User denied account access.')
      console.log(error)
    }
  }

  return (
    <Box>
      <Button onClick={connectToMetamask}>Connect to MetaMask</Button>
      {account && <Text>Connected with account: {account}</Text>}
    </Box>
  )
}
