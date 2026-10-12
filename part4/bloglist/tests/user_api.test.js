const { beforeEach, describe, test, after } = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('incorrect user post', () => {
  const validUser = {
    name: "Kyle CunningHam",
    username: "kcn",
    password: "kcPassword",
  }

  const cases = [
    ['password too short',  { password: 'kc' }],
    ['password missing',    { password: undefined }],
    ['username too short',  { username: 'k' }],
    ['username missing',    { username: undefined }],
  ]
  
  for (const [label, override] of cases) {
    test(`${label} returns 400`, async () => {
    await api
      .post('/api/users')
      .send({ ...validUser, ...override })
      .expect(400)
    })
  }
  
})

after(async () => {
  await mongoose.connection.close()
})