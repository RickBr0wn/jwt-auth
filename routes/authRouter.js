const express = require('express')
const authRouter = express.Router()
const passport = require('passport')
const passportConfig = require('../passport')
const JWT = require('jsonwebtoken')
const User = require('../models/User')
const Todo = require('../models/Todo')
const Task = require('../models/TaskSchema')
const Column = require('../models/ColumnSchema')

const signToken = userId =>
  JWT.sign(
    {
      iss: 'rick_brown',
      sub: userId,
    },
    'rick_brown',
    { expiresIn: '1h' }
  )

authRouter.get(
  '/get_all_data',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    let returnArr = []

    try {
      await User.findById({ _id: req.user._id })
        .populate('columns')
        .exec((err, columnDoc) => {
          if (err) {
            next(err)
          }
          columnDoc.columns.map(async column => {
            returnArr.push({ [column._id]: [], _id: column._id })
            await Column.findById({ _id: column._id })
              .populate('tasks')
              .exec((err, taskDoc) => {
                if (err) {
                  next(err)
                }
                returnArr.forEach((col, idx) => {
                  if (col[column._id]) {
                    col[column._id] = taskDoc.tasks
                  }
                })
                return res.status(200).json(returnArr)
              })
          })
        })
    } catch (error) {
      next(error)
    }
  }
)

authRouter.post(
  '/add_column',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const column = new Column()
      await column.save(async err => {
        if (err) {
          next(err)
        }

        req.user.columns.push(column._id)

        await req.user.save(err => {
          if (err) {
            next(err)
          }
        })
      })
      return res
        .status(200)
        .json({ message: `🤖 - successfully created column #${column._id}` })
    } catch (error) {
      next(error)
    }
  }
)

authRouter.post(
  '/add_task/:columnId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const columnId = req.params.columnId
    const task = new Task(req.body)
    let newTaskOrder = []

    await task.save(async (taskError, taskDocument) => {
      try {
        await task.save(async err => {
          if (err) {
            next(err)
          }

          newTaskOrder.push(taskDocument._id)

          await Column.findById({ _id: columnId }).then((doc, err) => {
            if (err) {
              next(err)
            }
            doc.tasks.forEach(task => newTaskOrder.push(task))
          })

          await Column.updateOne(
            { _id: columnId },
            { $set: { tasks: newTaskOrder } },
            err => {
              if (err) {
                next(err)
              }
            }
          )

          req.user.tasks.push(task._id)

          await req.user.save(err => {
            if (err) {
              next(err)
            }
          })

          await Column.findById({ _id: columnId })
            .populate('tasks')
            .exec()
            .then((doc, err) => {
              if (err) {
                next(err)
              }
            })
        })
        return res.status(200).json({
          message: `🤖 - successfully created task #${task._id} in column #${columnId}`,
        })
      } catch (err) {
        next(err)
      }
    })
  }
)

//   try {
//     await Column.findById({ _id: columnId }).then((doc, err) => {
//       if (err) {
//         next(err)
//       }
//       newTaskOrder = doc.tasks
//       newTaskOrder.splice(from, 1)
//       newTaskOrder.splice(to, 0, taskId)
//     })

//     await Column.updateOne(
//       { _id: columnId },
//       { $set: { tasks: newTaskOrder } },
//       err => {
//         if (err) {
//           next(err)
//         }
//       }
//     )

//     return res.status(200).json({
//       message: {
//         msgBody: `🤖 - task ${taskId} has been moved from index ${from} to index ${to}.`,
//         error: false,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// {
//   movedTaskId: draggableId,
//   fromColumn: source.droppableId,
//   toColumn: destination.droppableId,
//   fromIndex: source.index,
//   toIndex: destination.index,
// }

authRouter.post(
  '/move_task',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { movedTaskId, toIndex, fromIndex, toColumn, fromColumn } = req.body
    let newTaskOrder = []
    let original = []

    try {
      await Column.findById({ _id: fromColumn }).then((columnDoc, err) => {
        if (err) {
          next(err)
        }
        original = columnDoc

        newTaskOrder = columnDoc.tasks
        newTaskOrder.splice(fromIndex, 1)

        Column.updateOne(
          { _id: fromColumn },
          { $set: { tasks: newTaskOrder } },
          err => {
            if (err) {
              next(err)
            }
          }
        )
      })

      await Column.findById({ _id: toColumn }).then((columnDoc, err) => {
        if (err) {
          next(err)
        }
        newTaskOrder = columnDoc.tasks
        newTaskOrder.splice(toIndex, 0, movedTaskId)

        Column.updateOne(
          { _id: toColumn },
          { $set: { tasks: newTaskOrder } },
          err => {
            if (err) {
              next(err)
            }
            return res.status(200).json({
              original,
              columnDoc,
            })
          }
        )
      })
    } catch (error) {
      next(error)
    }
  }
)

authRouter.post('/register', (req, res) => {
  const { username, password, role } = req.body
  User.findOne({ username }, (err, userDocument) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody:
            '🤖 - oops! an error has occurred whilst communicating with the database',
          msgError: true,
        },
      })
    }
    if (userDocument) {
      res.status(400).json({
        message: {
          msgBody: '🤖🚫 - username already taken',
          msgError: true,
        },
      })
    } else {
      const newUser = new User({ username, password, role })
      newUser.save(err => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody:
                '🤖 - oops! an error has occurred whilst saving to the database',
              msgError: true,
            },
          })
        } else {
          res.status(200).json({
            message: {
              msgBody: '🤖👍🏻 - account successfully created',
              msgError: false,
            },
          })
        }
      })
    }
  })
})

authRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user
      const token = signToken(_id)
      res.cookie('access_token', token, { httpOnly: true, sameSite: true })
      res.status(200).json({ isAuthenticated: true, user: { username, role } })
    }
  }
)

authRouter.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.clearCookie('access_token')
    res.status(200).json({ user: { username: '', role: '' }, success: true })
  }
)

authRouter.post(
  '/todo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const todo = new Todo(req.body)
    todo.save(err => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody:
              '🤖 - an error has occurred whilst communicating with the todos.',
            msgError: true,
          },
        })
      }
      req.user.todos.push(todo)
      req.user.save(err => {
        // TODO: create error middleware for DRY approach
        if (err) {
          res.status(500).json({
            message: {
              msgBody: '🤖 - an error has occurred whilst saving the new todo.',
              msgError: true,
            },
          })
        }
        res.status(200).json({
          message: {
            msgBody: '🤖 - successfully created todo',
            msgError: false,
          },
        })
      })
    })
  }
)

authRouter.get(
  '/todos',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate('todos')
      .exec((err, doc) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody:
                '🤖- an error has occurred whilst populating the `user` todo array.',
              msgError: true,
            },
          })
        }
        res.status(200).json({ todos: doc.todos, authenticated: true })
      })
  }
)

authRouter.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role === 'admin') {
      res.status(200).json({
        message: { msgBody: '🤖👍🏻 - you are an admin', msgError: false },
      })
    } else {
      res.status(403).json({
        message: {
          msgBody: '🤖🚫 - you are not an admin, go away. ',
          msgError: true,
        },
      })
    }
  }
)

authRouter.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { username, role } = req.user
    res.status(200).json({ isAuthenticated: true, user: { username, role } })
  }
)

module.exports = authRouter
