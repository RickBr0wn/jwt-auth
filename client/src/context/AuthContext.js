import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../services/AuthService'

export const AuthContext = createContext()

export default ({ children }) => {
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
