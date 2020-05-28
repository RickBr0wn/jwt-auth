const mongoose = require('mongoose')

const ColumnOrder = mongoose.Schema({
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
})

module.exports = mongoose.model('ColumnOrder', ColumnOrder)
