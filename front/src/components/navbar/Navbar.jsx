import React from 'react'
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import ConnectWallet from '../connectWallet/ConnectWallet'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const iconColor = useColorModeValue('white', 'white')

  return (
    <Box bg='gray.800' py={4} px={8} width='100%'>
      <Flex alignItems='center' maxWidth='1200px' mx='auto'>
        <Spacer />
        <Box>
          {/* Navigation links */}
          <Flex>
            <Link
              href='/'
              p={2}
              mx={2}
              color='white'
              _hover={{ textDecoration: 'none' }}
            >
              Home
            </Link>
            <Link
              href='/events'
              p={2}
              mx={2}
              color='white'
              _hover={{ textDecoration: 'none' }}
            >
              Events
            </Link>
            <Link
              href='/addevent'
              p={2}
              mx={2}
              color='white'
              _hover={{ textDecoration: 'none' }}
            >
              Add event
            </Link>
            <ConnectWallet />
          </Flex>
        </Box>

        <Spacer />
        <Box>
          {/* Color mode toggle */}
          <IconButton
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            size='md'
            variant='ghost'
            color={iconColor}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar
