// const columns = [
//   {
//     '5ec6912213debd20d73ce27b': [
//       {
//         _id: '5ec6914813debd20d73ce27e',
//         title: 'Test title #3',
//       },
//       {
//         _id: '5ec6914313debd20d73ce27d',
//         title: 'Test title #2',
//       },
//       {
//         _id: '5ec6913c13debd20d73ce27c',
//         title: 'Test title #1',
//       },
//     ],
//     _id: '5ec6912213debd20d73ce27b',
//   },
// ]

// const source = { droppableId: '5ec6912213debd20d73ce27b', index: 0 }

// const destination = { droppableId: '5ec6912213debd20d73ce27b', index: 2 }

// const draggableId = '5ec6914813debd20d73ce27e'

// console.log(columns[0])

// let movingObj = {}

// columns.forEach(columnObj => {
//   if (columnObj._id === source.droppableId) {
//     movingObj = columnObj[source.droppableId][source.index]
//   }
// })

// const newTasks = columns.map(column => {
//   if (column._id === source.droppableId) {
//     const tasks = column[source.droppableId]
//     tasks.splice(source.index, 1)
//     tasks.splice(destination.index, 0, movingObj)
//     return tasks
//   }
// })

// const newColumns = [
//   ...columns,
//   { [source.droppableId]: newTasks, _id: source.droppableId },
// ]

// console.log(newColumns[0])
