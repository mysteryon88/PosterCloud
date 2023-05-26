import React from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'

import { FiCalendar } from 'react-icons/fi'

import 'react-datepicker/dist/react-datepicker.css'

function CustomInput({ value, onClick }) {
  return (
    <InputGroup>
      <Input placeholder='Select a date' onClick={onClick} value={value} />
      <InputRightElement>
        <IconButton
          aria-label='Select date'
          icon={<FiCalendar />}
          onClick={onClick}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default CustomInput
