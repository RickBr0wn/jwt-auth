import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import App from './components/App'
import AuthProvider from './context/AuthContext'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
)
