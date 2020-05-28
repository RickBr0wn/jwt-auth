import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Flex, Text } from '@chakra-ui/core'
import { Draggable } from 'react-beautiful-dnd'

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          padding="10px"
          border="1px solid lightgrey"
          borderRadius="10px"
          margin="10px 0px"
          backgroundColor="#eee">
          <Flex justifyContent="space-between" flexDirection="column">
            <Text fontSize="lg">{task.title}</Text>
            <Divider />
            <Text fontSize="sm">{task.body}</Text>
          </Flex>
        </Box>
      )}
    </Draggable>
  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default Task
