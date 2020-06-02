import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Stack, Text } from '@chakra-ui/core'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const Column = ({ column }) => {
  return (
    <Flex flexDirection="column">
      <Box>
        <Text fontSize="sm">Column #{column._id}</Text>
      </Box>
      <Box
        key={column._id}
        backgroundColor="#ddd"
        borderRadius="10px"
        height="750px"
        overflowY="scroll"
        margin="20px auto"
        padding="10px"
        width="400px">
        <Droppable droppableId={column._id}>
          {(provided, snapshot) => {
            console.log(snapshot.isDraggingOver)
            return (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                backgroundColor={
                  snapshot.isDraggingOver ? 'rgba(90,90,90,0.1)' : 'inherit'
                }>
                <Stack height="500px">
                  {column.tasks &&
                    column.tasks.map((task, idx) => (
                      <Task key={task._id} task={task} index={idx} />
                    ))}
                  {provided.placeholder}
                </Stack>
              </Box>
            )
          }}
        </Droppable>
      </Box>
    </Flex>
  )
}

Column.propTypes = {
  column: PropTypes.object,
}

export default Column
