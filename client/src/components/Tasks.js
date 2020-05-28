import React, { useEffect, useState } from 'react'
import TaskService from '../services/TaskService'
import { DragDropContext } from 'react-beautiful-dnd'
import { Box, Text } from '@chakra-ui/core'
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
    // let mutatingColumnArray = columns

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

    console.log(sendingObject)

    TaskService.moveTask(sendingObject)
      .then(res => console.log(res))
      .catch(err => console.log('🐻' + err))

    // TODO: this implementation will only work with one column
    setColumns([mutatingColumnObject])
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box width="100vw" marginTop="20px">
        <Text>Task Component</Text>
        {columns.length > 0 &&
          columns.map(column => <Column key={column._id} column={column} />)}
      </Box>
    </DragDropContext>
  )
}

export default Tasks

// const onDragEndFail = ({ destination, source, draggableId }) => {
//   if (!destination) {
//     return
//   }

//   if (
//     destination.droppableId === source.droppableId &&
//     destination.index === source.index
//   ) {
//     return
//   }

//   let movedObject = {}

//   columns.forEach(task => {
//     if (task._id === draggableId) {
//       movedObject = { ...task }
//     }
//   })

//   console.log({ movedObject })

//   const sendingObject = {
//     taskId: draggableId,
//     from: source.index,
//     to: destination.index,
//   }

//   // TaskService.moveTask(columnId, sendingObject)
//   //   .then(res => console.log(res))
//   //   .catch(err => console.log('🐻' + err))

//   const newTaskIds = Array.from(columns)

//   newTaskIds.splice(source.index, 1)
//   newTaskIds.splice(destination.index, 0, movedObject)

//   setColumns(newTaskIds)
// }
