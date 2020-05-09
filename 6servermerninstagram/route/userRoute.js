const express = require('express')
const router = express.Router()
const user = require('../model/user')
const post = require('../model/post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const requireLogin = require('../controller/requireLogin')

router.get('/user/:id', requireLogin, (req, res, next) => {
  user
    .findOne({ _id: req.params.id })
    .select('-password') //tous les champs sauf le password
    .then(user => {
      post
        .find({ postedBy: req.params.id })
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
          if (err) {
            res.status(404).json({
              err
            })
          } else {
            res.status(200).json({
              user,
              posts
            })
          }
        })
    })
    .catch(err => res.status(404).json({ err }))
})

router.get('/user', (req, res) => {
  user
    .find()
    .select('-password')
    .then(result => {
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(500).json({
          message: "can't fetch user data"
        })
      }
    })
})

router.put('/follow', requireLogin, (req, res) => {
  console.log(req.body.followID, 'req.body.followID')
  console.log(req.user._id, 'req.user._id')
  user.findByIdAndUpdate(
    req.body.followID,
    {
      $push: { followers: req.user._id }
    },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).json({ err })
      } else {
        user
          .findByIdAndUpdate(
            req.user._id,
            {
              $push: { following: req.body.followID }
            },
            { new: true }
          )
          .then(result => res.status(200).json(result))
          .catch(err => res.status(400).json(err))
      }
    }
  )
})

router.put('/unfollow', requireLogin, (req, res) => {
  console.log(req.body.followID, 'req.body.followID')
  console.log(req.user._id, 'req.user._id')
  user.findByIdAndUpdate(
    req.body.followID,
    {
      $pull: { followers: req.user._id }
    },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).json({ err })
      } else {
        user
          .findByIdAndUpdate(
            req.user._id,
            {
              $pull: { following: req.body.followID }
            },
            { new: true }
          )
          .then(result => res.status(200).json(result))
          .catch(err => res.status(400).json(err))
      }
    }
  )
})

module.exports = router
