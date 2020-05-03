import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Admin from './Admin'
import Todos from './Todos'
import Layout from './Layout'

const App = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/todos" component={Todos} />
      </Layout>
    </Router>
  )
}

export default App
