import React from 'react'
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  Link,
  Image,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

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
              Главная страница
            </Link>
            <Link
              href='/about'
              p={2}
              mx={2}
              color='white'
              _hover={{ textDecoration: 'none' }}
            >
              Мероприятия
            </Link>
            <Link
              href='/contact'
              p={2}
              mx={2}
              color='white'
              _hover={{ textDecoration: 'none' }}
            >
              Проверка билета
            </Link>
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
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar
