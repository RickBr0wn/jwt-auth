import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AuthService from '../services/AuthService'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  // TODO: convert to useReducer
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      AuthService.isAuthenticated().then(data => {
        setUser(data.user)
        setIsAuthenticated(data.isAuthenticated)
        setIsLoaded(true)
      })
    }
    return () => {}
  }, [isLoaded])

  if (!isLoaded) {
    return <h1>Loading data..</h1>
  }

  // TODO: set API so the user does not need to use the useContext hook
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.object,
}

function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuthContext }
