import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Flex, Text } from '@chakra-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import Handle from './Handle'

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          padding="10px"
          border="1px solid lightgrey"
          borderRadius="10px"
          margin="10px 0px"
          backgroundColor={snapshot.isDragging ? 'rgba(90,90,90,0.3)' : '#fff'}>
          <Flex justifyContent="space-between" flexDirection="column">
            <Flex justifyContent="space-between">
              <Text fontSize="lg">{task.title}</Text>

              <Handle handle={provided.dragHandleProps} />
            </Flex>
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
