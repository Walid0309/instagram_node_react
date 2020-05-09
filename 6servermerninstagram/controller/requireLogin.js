const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('user')
const dotenv = require('dotenv')

dotenv.config({
  path: './config/config.env'
})
const secret = process.env.JWT_SECRET_KEY

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({
      error: 'you dont have headers authorization'
    })
  } else {
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        res.status(401).json({ err: 'we cant see your token' })
      } else {
        const { _id } = payload
        User.findById(_id).then(userData => {
          req.user = userData
          next() // on met le next la et pas plus en bas pour attendre que req.user se remplit. sinon next sexecute avant que req.user se remplit
        })
      }
    })
  }
}
