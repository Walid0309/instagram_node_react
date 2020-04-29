const express = require('express')
const dotenv = require('dotenv')
const authRoute = require('./route/authRoute')
const postRoute = require('./route/postRoute')
const connectDB = require('./config/db')
const cors = require("cors")

dotenv.config({
  path: './config/config.env'
})

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', authRoute)
app.use('/', postRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT)
