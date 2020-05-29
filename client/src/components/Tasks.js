import React, { useEffect, useState } from 'react'
import TaskService from '../services/TaskService'
import { DragDropContext } from 'react-beautiful-dnd'
import { Box } from '@chakra-ui/core'
import Column from './Column'

const Tasks = () => {
  const [columns, setColumns] = useState([])

  useEffect(() => {
    TaskService.getAllData().then(res => {
      setColumns(res)
    })
  }, [])

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    let movingObj = {}
    let mutatingColumnObject = {}

    columns.forEach(columnObj => {
      if (columnObj._id === source.droppableId) {
        movingObj = columnObj[source.droppableId][source.index]
        mutatingColumnObject = columnObj
      }
    })

    mutatingColumnObject[source.droppableId].splice(source.index, 1)
    mutatingColumnObject[source.droppableId].splice(
      destination.index,
      0,
      movingObj
    )

    const sendingObject = {
      movedTaskId: draggableId,
      fromColumn: source.droppableId,
      toColumn: destination.droppableId,
      fromIndex: source.index,
      toIndex: destination.index,
    }

    TaskService.moveTask(sendingObject)
      .then(res => console.warn(res))
      .catch(err => console.error('🐻' + err))

    // TODO: this implementation will only work with one column
    setColumns([mutatingColumnObject])
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box width="100vw" marginTop="20px">
        {columns.length > 0 &&
          columns.map(column => <Column key={column._id} column={column} />)}
      </Box>
    </DragDropContext>
  )
}

export default Tasks
