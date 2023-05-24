import { Box, Flex, Link, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box bg='gray.800' color='white' py={8}>
      <Flex justify='center' align='center' direction='column'>
        <Text fontSize='lg' mb={2}>
          © 2023 PosterCloud. All rights reserved.
        </Text>
        <Flex>
          <Link href='#' mx={2}>
            Terms of Service
          </Link>
          <Link href='#' mx={2}>
            Privacy Policy
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
