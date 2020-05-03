import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { AuthProvider } from './context/AuthContext'
import { CSSReset, theme, ThemeProvider } from '@chakra-ui/core'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <CSSReset />
      <App />
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
