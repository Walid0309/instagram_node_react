const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true,
    default: 'no photo'
  },
  postedBy: {
    type: ObjectId,
    ref: 'user'
  }
})

module.exports = mongoose.model('post', PostSchema)
