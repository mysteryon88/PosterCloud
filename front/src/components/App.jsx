import React from 'react'
import {
  ChakraProvider,
  Box,
  Text,
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
import Registration from './registration/Registration'
import Footer from './footer/Footer'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/registration' element={<Registration />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
