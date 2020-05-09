const express = require('express')
const router = express.Router()
const post = require('../model/post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const requireLogin = require('../controller/requireLogin')

router.get('/allPost', requireLogin, (req, res) => {
  console.log('entre dans le all post')
  post
    .find()
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
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

router.get('/myPost', requireLogin, (req, res) => {
  post
    .find({ postedBy: req.user._id })
    .populate('postedBy', '_id name')
    .then(resp => {
      console.log(resp, 'respon')
      res.json({ resp })
    })
    .catch(err => console.log(err))
})

router.put('/like', requireLogin, (req, res) => {
  console.log(req.body.postID, 'request like')
  post
    .findByIdAndUpdate(
      req.body.postID,
      {
        $push: { likes: req.user._id }
      },
      {
        new: true
      }
    )
    .exec((err, result) => {
      if (err) {
        res.status(404).json({
          err
        })
      } else {
        res.status(200).json({ result })
      }
    })
})

router.put('/unLike', requireLogin, (req, res) => {
  post
    .findByIdAndUpdate(
      req.body.postID,
      {
        $pull: { likes: req.user._id }
      },
      {
        new: true
      }
    )
    .exec((err, result) => {
      if (err) {
        res.status(404).json({
          err
        })
      } else {
        res.status(200).json({
          result
        })
      }
    })
})

router.put('/comment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id
  }
  post
    .findByIdAndUpdate(
      req.body.postID,
      {
        $push: { comments: comment }
      },
      {
        new: true
      }
    )
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        res.status(404).json({
          err
        })
      } else {
        res.status(200).json({ result })
      }
    })
})

router.delete('/delete/:postID', requireLogin, (req, res) => {
  console.log(req.user._id.toString(), '11111')
  post
    .findOne({ _id: req.params.postID })
    .populate('postedBy', '_id')
    .exec((err, posts) => {
      console.log(posts, 'post on postroute')
      if (err || !posts) {
        res.status(404).json({ err: 'pas de post' })
      }
      if (posts.postedBy._id.toString() === req.user._id.toString()) {
        post
          .deleteOne()
          .then(result => res.json(result))
          .catch(err => console.log(err, 'eroor on server'))
      }
    })
})

// router.delete('/delete/:commentID', requireLogin, (req, res) => {
//   post
//     .findOne({ _id: req.params.commentID })
//     .populate('postedBy', '_id')
//     .exec((err, comments) => {
//       console.log(comments, 'post on postroute')
//       if (err || !comments) {
//         res.status(404).json({ err: 'pas de post' })
//       }
//       if (comments.postedBy._id.toString() === req.user._id.toString()) {
//         post
//           .deleteOne()
//           .then(result =>
//             res.json(result)
//           )
//           .catch(err =>
//             console.log(err,"eroor on server")
//           )
//       }
//     })
// })

module.exports = router
