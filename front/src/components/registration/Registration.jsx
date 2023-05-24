import React from 'react'
import {
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputProps,
  FormHelperText,
  useMultiStyleConfig,
  Card,
  CardHeader,
  Text,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Center,
} from '@chakra-ui/react'
import { registration } from '../../actions/user'

const Registration = () => {
  let email
  let password

  return (
    <div className='registration'>
      <div className='registration__header'>Регистрация</div>
      <Input value={email} type='text' placeholder='Введите email...' />
      <Input value={password} type='password' placeholder='Введите пароль...' />
      <button
        className='registration__btn'
        onClick={() => registration(email, password)}
      >
        Sign Up
      </button>
    </div>
  )
}

export default Registration
