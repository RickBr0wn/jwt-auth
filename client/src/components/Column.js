import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Text } from '@chakra-ui/core'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const Column = ({ column }) => {
  return (
    <Box
      key={column._id}
      backgroundColor="#ddd"
      borderRadius="10px"
      height="750px"
      overflowY="scroll"
      margin="20px auto"
      padding="10px"
      maxWidth="400px">
      <Text fontSize="2xl">Column #{column._id}</Text>
      <Droppable droppableId={column._id}>
        {provided => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            <Stack>
              {column.tasks &&
                column.tasks.map((task, idx) => (
                  <Task key={task._id} task={task} index={idx} />
                ))}
              {provided.placeholder}
            </Stack>
          </Box>
        )}
      </Droppable>
    </Box>
  )
}

Column.propTypes = {
  column: PropTypes.object,
}

export default Column
