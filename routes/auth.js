/* eslint-disable no-underscore-dangle */
const router = require('express').Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')

const User = mongoose.model('User')
const JSON_SECRET_KEY = process.env.JWT_SECRET

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(401).json({ error: 'Please fill all required fields' })
  }

  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(401).json({ error: 'User with this email id already exists' })
      }

      bcrypt.hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name,
            email,
            password: hashedPassword,
          })

          user.save()
            .then(() => {
              res.json({ message: 'user registered successfully' })
            })
            .catch(() => {
              res.status(401).json({ error: 'Failed to save user.' })
            })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/signin', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(401).json({ error: 'invalid username or password' })
      }

      bcrypt.compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JSON_SECRET_KEY)
            res.json({ message: 'login successful', token })
          } else {
            return res.status(401).json({ error: 'invalid username or password' })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/protected', requireLogin, (req, res) => {
  res.send('Hello user')
})

module.exports = router
