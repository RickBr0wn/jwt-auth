import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AuthService from '../services/AuthService'
import Message from './Message'

const Register = props => {
  const [user, setUser] = useState({ username: '', password: '', role: '' })
  const [message, setMessage] = useState(null)
  let timerID = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  const onSubmit = e => {
    console.log({ user })
    e.preventDefault()
    AuthService.register(user).then(({ message }) => {
      setMessage(message)
      resetForm()
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push('/login')
        }, 2000)
      }
    })
  }

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const resetForm = () => setUser({ username: '', password: '', role: '' })

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h3>Please register in..</h3>
        <label htmlFor="username" className="sr-only">
          Username:
        </label>
        <input
          type="text"
          value={user.username}
          name="username"
          onChange={onChange}
          className="form-control"
          placeholder="Enter username.."
        />
        <label htmlFor="password" className="sr-only">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          className="form-control"
          placeholder="Enter password.."
        />
        <label htmlFor="role" className="sr-only">
          Role:
        </label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={onChange}
          className="form-control"
          placeholder="Enter role (admin/user)"
        />
        <button className="btn btn-large btn-primary btn-block" type="submit">
          Register
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

Register.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Register
