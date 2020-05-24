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
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT, () => {
  console.log('Server listening on port number ', PORT)
})
