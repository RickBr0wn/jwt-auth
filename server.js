const express = require('express')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()

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

app.listen(5000, () => {
  console.log(`🌎 => http server`)
})
