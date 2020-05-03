import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Box, Flex, useToast } from '@chakra-ui/core'
import AuthService from '../services/AuthService'
import { useAuthContext } from '../context/AuthContext'

// user : {username: "testing123", role: "admin"}

const Navbar = ({ history }) => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    user,
  } = useAuthContext()
  const toast = useToast()

  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.success) {
        setUser(data.user)
        setIsAuthenticated(false)
        history.push('/')
        toast({
          title: 'Success.',
          description: 'You have logged out of your account.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }
    })
  }

  return (
    <Flex
      data-testid="navbar"
      padding="5px 20px"
      width="100vw"
      height="30px"
      backgroundImage="linear-gradient(to right, #83a4d4, #b6fbff)"
      justifyContent="space-between">
      <Link data-testid="link" to="/">
        <Box>Home</Box>
      </Link>
      <Flex>
        {isAuthenticated ? (
          <>
            {user.role === 'admin' ? (
              <Link data-testid="link" to="/admin">
                <Box marginRight="25px">Admin</Box>
              </Link>
            ) : null}
            <Link to="/todos">
              <Box marginRight="25px">Todos</Box>
            </Link>
            <button type="button" onClick={onClickLogoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link data-testid="link" to="/register">
              <Box marginRight="25px">Register</Box>
            </Link>
            <Link data-testid="link" to="/login">
              <Box>Login</Box>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  )
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Navbar)
