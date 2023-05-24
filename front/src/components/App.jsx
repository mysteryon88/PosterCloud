import React from 'react'
import {
  ChakraProvider,
  Box,
  Flex,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
  Container,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  HStack,
} from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
