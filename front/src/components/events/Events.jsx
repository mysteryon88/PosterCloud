import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useEthereumContext } from '../ethereumContext/EthereumContext'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import contractABI from './PosterCloud.json'

const contractAddress = '0xB21176b92bFe0f81269094C2027ADF2487074d2e'

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
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      const eventsCount = await contract.getEventsCount()

      /*const tx = await contract
        .connect(signer)
        .addEvent('name', Date.now(), 'info', 100)
        */
      //const event = await contract.getEvent()
      //console.log(event)
      console.log(Number(eventsCount))
      const allEvents = []
      for (let i = 0; i < Number(eventsCount); i++) {
        console.log(i)
        const event = await contract.getEventInfo(i)
        allEvents.push(event)
        //await contract.mintTicket(i, 'uri', account)
      }

      setEvents(allEvents)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuyTicket = async (eventId) => {
    // Здесь вызывается функция на сервере для покупки билета
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
          <Heading mb={2}>{event[0]}</Heading> {/* Название мероприятия */}
          <Text mb={2}>{event[1]}</Text> {/* Дата или время мероприятия */}
          <Text mb={2}>{event[2]}</Text> {/* Описание мероприятия */}
          <Text mb={2}>{event[3]}</Text> {/* Адрес организатора */}
          <Button colorScheme='blue' onClick={() => handleBuyTicket(index)}>
            Купить билет
          </Button>
        </Box>
      ))}
    </Box>
  )
}
