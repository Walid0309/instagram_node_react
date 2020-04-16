const express = require('express')
const dotenv = require('dotenv')
const authRoute = require('./route/authRoute')
const connectDB = require('./config/db')

dotenv.config({
  path: './config/config.env'
})

connectDB()
const app = express()

app.use(express.json())
app.use('/', authRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT)
