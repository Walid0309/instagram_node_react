const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pic: {
    type: String
  },
  followers: [{ type: ObjectId, ref: 'user' }],
  following: [{ type: ObjectId, ref: 'user' }]
})

module.exports = mongoose.model('user', UserSchema)
