import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useEthereumContext } from '../ethereumContext/EthereumContext'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import PosterCloud from '../../abi/PosterCloud.json'
import { handleBuyTicket } from '../../utils/actions'
import Tickets from '../../abi/Tickets.json'

const contractAddress = '0x2088A990D6A8c42A953F78bBd276d83775b61d5b'

export default function DisplayEvents() {
  const { account, provider, signer } = useEthereumContext()
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (provider && signer) {
      fetchEvents()
    }
  }, [provider, signer])

  const fetchEvents = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, PosterCloud, signer)

      const eventsCount = await contract.getEventsCount()

      console.log(Number(eventsCount))
      const allEvents = []
      for (let i = 0; i < Number(eventsCount); i++) {
        console.log(i)
        const event = await contract.getEventInfo(i)
        allEvents.push(event)
      }

      setEvents(allEvents)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      {events.map((event, index) => (
        <Box
          key={index}
          borderWidth={1}
          borderRadius='lg'
          overflow='hidden'
          p={4}
          mb={4}
        >
          <Heading mb={2}>{event[0]}</Heading>
          <Text mb={2}>{event[1]}</Text>
          <Text mb={2}>{event[2]}</Text>
          <Text mb={2}>{event[3]}</Text>
          <Button
            colorScheme='blue'
            onClick={() => handleBuyTicket(index, account)}
          >
            To buy a ticket
          </Button>
        </Box>
      ))}
    </Box>
  )
}
