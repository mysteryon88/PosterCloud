import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, Box, Flex, theme } from '@chakra-ui/react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

import Navbar from './navbar/Navbar'
import AddEvent from './addEvent/AddEvent'
import Footer from './footer/Footer'
import Events from './events/Events'
import { EthereumProvider } from './ethereumContext/EthereumContext'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction='column' minH='100vh'>
        <BrowserRouter>
          <EthereumProvider>
            <Box flex='1'>
              <Navbar />
              <Routes>
                <Route path='/addevent' element={<AddEvent />} />
                <Route path='/events' element={<Events />} />
              </Routes>
            </Box>
            <Box>
              <Footer />
            </Box>
          </EthereumProvider>
        </BrowserRouter>
      </Flex>
    </ChakraProvider>
  )
}

export default App
