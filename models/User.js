const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
})

// hash the password before saving to database
UserSchema.pre('save', function (next) {
  // check to see if the password has already been hashed
  // do not hash it twice!
  if (this.isModified('password')) {
    next()
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    this.password = hash
  })
})

// compare the plain text version of the password (from the client)
// with the hashed password on the database
UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      callback(err)
    } else {
      if (!isMatch) {
        return callback(null, isMatch)
      }
      return callback(null, this)
    }
  })
}

module.exports = mongoose.model('User', UserSchema)
