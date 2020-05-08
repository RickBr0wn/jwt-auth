import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@chakra-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import TodoItem from './TodoItem'

const Column = ({ todos }) => {
  return (
    <Droppable droppableId={`column-1`}>
      {provided => (
        <div
          className="list-group"
          ref={provided.innerRef}
          {...provided.droppableProps}>
          <Stack>
            {todos.map((todo, idx) => (
              <TodoItem key={todo._id} todo={todo} index={idx} />
            ))}
          </Stack>
        </div>
      )}
    </Droppable>
  )
}

Column.propTypes = {
  todos: PropTypes.array.isRequired,
  snapshot: PropTypes.object,
}

export default Column
