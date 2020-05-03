import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({ todo }) => <li>{todo}</li>

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
}

export default TodoItem
