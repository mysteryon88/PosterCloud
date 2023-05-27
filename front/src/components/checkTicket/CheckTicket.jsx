import React, { useState, useEffect } from 'react'
import { Button, Text, Flex } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { checkTicket } from '../../utils/actions'

function CheckTicket() {
  const [eventId, setEventId] = useState(null)
  const [ticketId, setTicketId] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const eventIdParam = searchParams.get('eventid')
    const ticketIdParam = searchParams.get('ticketid')
    if (eventIdParam) {
      setEventId(parseInt(eventIdParam, 10))
    }
    if (ticketIdParam) {
      setTicketId(parseInt(ticketIdParam, 10))
    }
  }, [location])

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ height: '100vh' }}
    >
      {eventId + 1 && <Text>Your event ID: {eventId}</Text>}
      {ticketId && <Text>Your ticket ID: {ticketId}</Text>}
      <Button onClick={() => checkTicket(eventId, ticketId)}>
        Check Ticket
      </Button>
    </Flex>
  )
}

export default CheckTicket
