import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, Box, Flex, theme } from '@chakra-ui/react'

import { EthereumProvider } from './ethereumContext/EthereumContext'
import Navbar from './navbar/Navbar'
import AddEvent from './addEvent/AddEvent'
import Footer from './footer/Footer'
import Events from './events/Events'
import CheckTicket from './checkTicket/CheckTicket'

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
                <Route path='/check' element={<CheckTicket />} />
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
