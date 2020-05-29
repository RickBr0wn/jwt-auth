const express = require('express')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const cors = require('cors')
const middlewares = require('./middlewares')

const app = express()

app.use(cors())
app.use(cookie())
app.use(express.json())

mongoose.connect(
  'mongodb://localhost:27017/jwt-auth',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('📦 => database')
  }
)

app.use('/auth', authRouter)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(5000, () => {
  console.log(`🌎 => http server`)
})
