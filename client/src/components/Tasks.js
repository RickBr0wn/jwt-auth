import React, { useEffect, useState } from 'react'
import TaskService from '../services/TaskService'
import { DragDropContext } from 'react-beautiful-dnd'
import { Flex } from '@chakra-ui/core'
import Column from './Column'

const Tasks = () => {
  const [columns, setColumns] = useState([])

  useEffect(() => {
    TaskService.getAllData().then(res => {
      setColumns(res)
    })
  }, [])

  const onDragEnd = ({ destination, source, draggableId }) => {
    //  draggableId: "5ebbda333ff1980a0d16f081"}
    //  type: 'TYPE'
    //  reason: 'DROP'
    //  destination: {droppableId: "5ec6912213debd20d73ce27b", index: 1}
    //  source: { droppableId: "5ec6912213debd20d73ce27b", index: 0 }
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    let movingColumn = {}

    columns.forEach(column => {
      if (column._id === source.droppableId) {
        movingColumn = { ...column }
      }
    })

    const newTaskArray = Array.from(movingColumn.tasks)

    let movingTask = {}

    newTaskArray.forEach(task => {
      if (task._id === draggableId) {
        movingTask = { ...task }
      }
    })

    newTaskArray.splice(source.index, 1)
    newTaskArray.splice(destination.index, 0, { ...movingTask })

    const newColumn = {
      ...movingColumn,
      tasks: newTaskArray,
    }

    let newColumnArray = columns.map(column => {
      if (column._id === newColumn._id) {
        return newColumn
      }
      return column
    })

    const sendingObject = {
      movedTaskId: draggableId,
      fromColumn: source.droppableId,
      toColumn: destination.droppableId,
      fromIndex: source.index,
      toIndex: destination.index,
    }

    TaskService.moveTask(sendingObject)
      .then(res => console.log(res))
      .catch(err => console.error('🐻' + err))

    setColumns(newColumnArray)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex width="100vw" marginTop="20px" flexDirection="row">
        {columns.length > 0 &&
          columns.map(column => <Column key={column._id} column={column} />)}
      </Flex>
    </DragDropContext>
  )
}

export default Tasks
