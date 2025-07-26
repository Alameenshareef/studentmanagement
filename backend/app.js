const express = require('express')
const app = express()
const connectDB = require("./config/db")
const cors = require('cors')
require('dotenv').config()
connectDB()

app.use(cors())
app.use(express.json())



app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/student'));
app.use('/api/staff', require('./routes/staff'));

module.exports = app

