/* eslint-disable no-console */
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
const { MONGODB_URI } = process.env

// eslint-disable-next-line no-eval
mongoose.connect(eval(MONGODB_URI), { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
  .on('connected', () => { console.log('connected to monodb') })
  .on('error', (err) => { console.log('failed to connect to mongodb', err) })

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth.js'))

app.listen(PORT, () => {
  console.log('Serer listening on port number ', PORT)
})
