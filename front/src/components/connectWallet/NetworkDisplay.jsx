import React, { useEffect } from 'react'

const NetworkDisplay = () => {
  useEffect(() => {
    const getNetwork = async () => {
      if (window.ethereum) {
        const networkId = await window.ethereum.request({
          method: 'net_version',
        })
        let networkName

        switch (networkId) {
          case '1':
            networkName = 'Mainnet'
            break
          case '2':
            networkName = 'Morden'
            break
          case '3':
            networkName = 'Ropsten'
            break
          case '4':
            networkName = 'Rinkeby'
            break
          case '5':
            networkName = 'Goerli'
            break
          case '11155111':
            networkName = 'Sepolia'
            break
          default:
            networkName = 'Unknown'
        }

        console.log(`You are connected to ${networkName}`)
      } else {
        console.log('Please install MetaMask')
      }
    }

    getNetwork()
  }, [])

  return <div></div>
}

export default NetworkDisplay
