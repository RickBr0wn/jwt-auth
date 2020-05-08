import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/core'
import { DragDropContext } from 'react-beautiful-dnd'
// import { useAuthContext } from '../context/AuthContext'
import Column from './Column'
// import Message from './Message'
import TodoService from '../services/TodoService'

const Todos = () => {
  // const [todo, setTodo] = useState({ name: '' })
  const [todos, setTodos] = useState([])
  // const [message, setMessage] = useState(null)
  // const { setUser, setIsAuthenticated } = useAuthContext()

  useEffect(() => {
    TodoService.getTodos().then(data => {
      setTodos(data.todos)
    })
  }, [])

  // const resetForm = () => {
  //   setTodo({ name: '' })
  // }

  // const onChange = e => setTodo({ name: e.target.value })

  // const onSubmit = e => {
  //   e.preventDefault()
  //   TodoService.postTodo(todo).then(({ message }) => {
  //     resetForm()
  //     if (!message.msgError) {
  //       TodoService.getTodos().then(data => {
  //         console.log({ data })
  //         setTodos(data.todos)
  //       })
  //       setMessage(message)
  //     } else if (message.msgBody === 'UnAuthorized') {
  //       // token has expired
  //       setMessage(message)
  //       setUser({ username: '', role: '' })
  //       setIsAuthenticated(false)
  //     } else {
  //       setMessage(message)
  //     }
  //   })
  // }

  const onDragEnd = () => {}

  console.log({ todos })

  return (
    <Box padding="20px" maxWidth="400px" margin="0 auto" overflowY="scroll">
      <DragDropContext onDragEnd={onDragEnd}>
        <Column todos={todos} />
      </DragDropContext>
      {/* <br />
      <form onSubmit={onSubmit}>
        <label htmlFor="todo">Enter Todo</label>
        <input
          type="text"
          value={todo.name}
          onChange={onChange}
          className="form-control"
          placeholder="Please enter a Todo"
        />
        <button className="btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
      {message && <Message message={message} />} */}
    </Box>
  )
}

export default Todos
