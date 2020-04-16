const express = require('express')
const router = express.Router()
const user = require('../model/user')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv= require("dotenv")

dotenv.config({
    path: './config/config.env'
  })

  const {JWT_SECRET_KEY} = process.env;


router.get('/', (req, res) => {
  res.send('ca marche')
})

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(404).json({
      error: 'please fill all field'
    })
  }
  user
    .findOne({ email: email })
    .then(savedUser => {
      if (savedUser) {
        res.send('already registred')
      } else {
          bcrypt.hash(password,12).then(hashed=>{
            let User = new user({
                name,
                email,
                password:hashed
              })
              let myUser = new Promise((resolve, reject) => {
                resolve(User.save())
              })
              myUser
                .then(e => console.log(e, 'result'))
                .catch(err => console.log(err))

                res.send("tout est ok")
          }).catch(err=>console.log(err, "password not hashed"))
       
      }
    })
    .catch(err => console.log(err, "error when saved user"))
})

router.post("/signin", (req,res)=>{
    const {email,password} = req.body; 
    if(!email||!password){
        res.json({
            error:"you have to fill all field"
        })
    }
    user.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            const token = jwt.sign({_id:savedUser._id},JWT_SECRET_KEY)
            bcrypt.compare(password,savedUser.password).then(goodPassword=>{
                console.log(token,"token")
                if(goodPassword){
                    res.json({
                        message: "you are the good user you can connect"
                    })
                }
                else{
                    res.status(404).json({
                        message: " wrong name or password"
                    })
                }
            })
        }
    }
    ).catch(err=>console.log(err,"erreur dans la verification pour savoir si le user a deja ete saved ou non"))
})


module.exports = router
