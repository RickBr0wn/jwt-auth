import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { AuthProvider } from './context/AuthContext'
import { CSSReset, theme, ThemeProvider } from '@chakra-ui/core'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
