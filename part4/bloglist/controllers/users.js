const User = require('../models/user')
const userRouter = require('express').Router()
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body
  const saltRounds = 10
  
  if (password === undefined) {
    res.status(400).json({error: 'password missing'})
  } else if (password.length < 3) {
    res.status(400).json({error: 'password too short'})
  }

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name, 
    username,
    passwordHash
  })

  const result = await user.save()
  res.status(201).json(result)
})

module.exports = userRouter