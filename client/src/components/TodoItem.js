import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import { Box, Heading, Text } from '@chakra-ui/core'

const TodoItem = ({ todo, index, ...rest }) => {
  return (
    <Draggable draggableId={todo._id} index={index}>
      {provided => (
        <>
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            p={5}
            shadow="md"
            mb="5px"
            backgroundColor="lightgrey"
            borderWidth="1px"
            {...rest}>
            <Heading fontSize="xl">{todo.name}</Heading>
            <Text mt={4}>{todo.name}</Text>
          </Box>
          {provided.placeholder}
        </>
      )}
    </Draggable>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  rest: PropTypes.object,
}

export default TodoItem
