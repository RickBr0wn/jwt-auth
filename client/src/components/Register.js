import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/core'
import AuthService from '../services/AuthService'

const Register = props => {
  const [role, setRole] = useState('user')
  const [user, setUser] = useState({ username: '', password: '', role })
  let timerID = useRef(null)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  const isDisabled = !user.username || !user.password || !user.role

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  const onSubmit = e => {
    e.preventDefault()
    AuthService.register({ ...user, role }).then(({ message }) => {
      resetForm()
      toast({
        title: 'Success.',
        description: message.msgBody,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push('/login')
        }, 2000)
      } else {
        toast({
          title: 'Error.',
          description: message.msgBody,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    })
  }

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const resetForm = () => setUser({ username: '', password: '', role: 'user' })

  return (
    <Flex
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center">
      <form onSubmit={onSubmit}>
        <FormControl
          backgroundColor="#eee"
          width="400px"
          padding="40px 60px"
          borderRadius="10px"
          boxShadow="lg"
          marginTop="-100px">
          <Stack spacing={3}>
            <Text fontSize="3xl" fontWeight="bold">
              REGISTER
            </Text>
            <FormLabel htmlFor="username" className="sr-only">
              Username:
            </FormLabel>
            <Input
              mt="-14px"
              type="text"
              value={user.username}
              name="username"
              onChange={onChange}
              placeholder="Enter username.."
            />
            <FormLabel htmlFor="password" className="sr-only">
              Password:
            </FormLabel>
            <InputGroup size="md" mt="-14px">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                name="password"
                placeholder="Enter password.."
                onChange={onChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormLabel htmlFor="role" className="sr-only">
              Role:
            </FormLabel>
            <RadioGroup
              onChange={() =>
                setRole(prev => (prev === 'user' ? 'admin' : 'user'))
              }
              defaultValue="user"
              spacing={15}
              backgroundColor="#fff"
              width="100%"
              borderRadius="5px"
              padding="8px"
              mt="-14px"
              isInline>
              <Radio variantColor="teal" value="admin">
                Admin
              </Radio>
              <Radio variantColor="teal" value="user">
                User
              </Radio>
            </RadioGroup>
            <Button
              mt="20px"
              width="100%"
              type="submit"
              variantColor="teal"
              disabled={isDisabled}>
              Register
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Flex>
  )
}

Register.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Register
