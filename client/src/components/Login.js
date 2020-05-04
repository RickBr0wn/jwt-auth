import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Stack,
  useToast,
} from '@chakra-ui/core'
import { useAuthContext } from '../context/AuthContext'
import AuthService from '../services/AuthService'

const Login = props => {
  const [userObj, setUserObj] = useState({ username: '', password: '' })
  const { setUser, setIsAuthenticated } = useAuthContext()
  const isDisabled = !userObj.username || !userObj.password
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()

  const onSubmit = e => {
    e.preventDefault()
    AuthService.login(userObj)
      .then(({ isAuthenticated, user }) => {
        if (isAuthenticated) {
          setUser(user)
          setIsAuthenticated(isAuthenticated)
          toast({
            title: 'Success.',
            description: 'You have been logged in to your account.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          props.history.push('/todos')
          // } else {
          //   // TODO: broken here
          //   toast({
          //     title: 'Error.',
          //     description: 'broken',
          //     status: 'warning',
          //     duration: 2000,
          //     isClosable: true,
          //   })
        }
      })
      .catch(err => {
        setUserObj({ username: '', password: '' })
        toast({
          title: 'Error.',
          description: err.message,
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      })
  }

  const onChange = e =>
    setUserObj({ ...userObj, [e.target.name]: e.target.value })

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
              SIGN IN
            </Text>
            <FormLabel htmlFor="username" className="sr-only">
              Username:
            </FormLabel>
            <Input
              type="text"
              name="username"
              onChange={onChange}
              placeholder="Enter username.."
              mt="-14px"
            />
            <FormLabel htmlFor="password" className="sr-only">
              Password:
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                name="password"
                placeholder="Enter password.."
                onChange={onChange}
                mt="-14px"
              />
              <InputRightElement width="4.5rem" mt="-14px">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              mt="20px"
              variantColor="teal"
              type="submit"
              disabled={isDisabled}>
              Log In
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Flex>
  )
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Login
