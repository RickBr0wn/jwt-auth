import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  )

  console.log(user)
  console.log(isAuthenticated)

  return (
    <div data-testid="app">
      <h1>Webpack & React minimal boilerplate.</h1>
    </div>
  )
}

export default App
