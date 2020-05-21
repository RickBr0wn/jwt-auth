import React, { useEffect, useState } from 'react'
import TaskService from '../services/TaskService'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import { Box, Text } from '@chakra-ui/core'
import Column from './Column'

const Tasks = () => {
  const [columns, setColumns] = useState([])

  useEffect(() => {
    TaskService.getAllData().then(res => {
      setColumns(res)
    })
  }, [])

  // const onDragEnd = ({ destination, source, draggableId }) => {
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

  return (
    <>
      {columns.length > 0 &&
        columns.map(column => <Column key={column._id} column={column} />)}
    </>
  )
}

export default Tasks
