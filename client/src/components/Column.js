import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Stack, Text } from '@chakra-ui/core'
// import { Droppable, Draggable } from 'react-beautiful-dnd'

const Column = ({ column }) => {
  return (
    <Box
      key={column._id}
      backgroundColor="#ddd"
      borderRadius="10px"
      height="100%"
      overflowY="scroll"
      margin="20px"
      padding="10px"
      maxWidth="400px">
      <Text fontSize="2xl">Column #{column._id}</Text>

      <Stack>
        {column[column._id] &&
          column[column._id].map(task => (
            <Box
              key={task._id}
              backgroundColor="#fff"
              padding="20px"
              borderRadius="10px"
              marginBottom="10px">
              <Text fontSize="lg">{task.title}</Text>
              <Divider />
              <Text>{task.body}</Text>
            </Box>
          ))}
      </Stack>
    </Box>
  )
}

Column.propTypes = {
  column: PropTypes.object,
}

export default Column
