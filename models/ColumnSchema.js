const mongoose = require('mongoose')

const ColumnSchema = mongoose.Schema({
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
})

module.exports = mongoose.model('Column', ColumnSchema)
