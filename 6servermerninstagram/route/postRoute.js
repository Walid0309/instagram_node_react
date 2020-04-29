const express = require('express')
const router = express.Router()
const post = require('../model/post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const requireLogin = require('../controller/requireLogin')

router.get('/allPost', (req, res) => {
  post
    .find()
    .populate('postedBy', '_id name')
    .then(allpost => {
      // on specifie id name car on veut que ca. pas de password ni email.
      res.status(200).json({
        allpost
      })
    })
})

router.post('/createpost', requireLogin, (req, res) => {
  const { title, body, url } = req.body
  console.log(title, body, url, 'bla')

  if (!title || !body || !url) {
    res.status(401).json({
      err: 'please add every fill'
    })
  }

  req.user.password = undefined // on veut pas que le password soit dans postedBy

  const Post = new post({
    title,
    body,
    photo: url,
    postedBy: req.user
  })

  Post.save()
    .then(result => {
      res.json({
        post: result
      })
    })
    .catch(err => {
      res.status(404).json({ err })
    })
})

router.get('/mypost', requireLogin, (req, res) => {
  post
    .find({ postedBy: req.user._id })
    .populate('postedBy', '_id name')
    .then(resp => res.json({ resp }))
    .catch(err => console.log(err))
})

module.exports = router
