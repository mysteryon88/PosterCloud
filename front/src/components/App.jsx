import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, Box, Flex, theme } from '@chakra-ui/react'

import Navbar from './navbar/Navbar'
import AddEvent from './addEvent/AddEvent'
import Footer from './footer/Footer'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction='column' minH='100vh'>
        <BrowserRouter>
          <Box flex='1'>
            <Navbar />
            <Routes>
              <Route path='/addevent' element={<AddEvent />} />
            </Routes>
          </Box>
          <Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </Flex>
    </ChakraProvider>
  )
}

export default App
