import React, { useState } from 'react'
import { Box, Input, Button, Stack } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { addEvent } from '../../utils/actions'
import CustomInput from '../customInput/CustomInput'

function AddEvent() {
  const [name, setName] = useState('')
  const [info, setInfo] = useState('')
  const [totalTickets, setTotalTickets] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)

  const handleAdd = () => {
    if (selectedDate) {
      const timestamp = Math.floor(selectedDate.getTime() / 1000)
      addEvent(name, timestamp, info, totalTickets)
    } else {
      console.log('Please select a date.')
    }
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='center' p={10}>
      <Stack spacing={3}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
        />
        <Box>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            dateFormat='MMMM d, yyyy h:mm aa'
            customInput={<CustomInput />}
          />
        </Box>
        <Input
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          placeholder='Info'
        />
        <Input
          value={totalTickets}
          onChange={(e) => setTotalTickets(e.target.value)}
          placeholder='Total Tickets'
          type='number'
        />
        <Button onClick={handleAdd}>Add event</Button>
      </Stack>
    </Box>
  )
}

export default AddEvent
