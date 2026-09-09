const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('HTTP GET req to /api/blogs url', () => {
  test('returned as application/json ', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs returned', async () => {
    const res = await api.get('/api/blogs')

    assert.strictEqual(res.body.length, helper.initialBlogs.length)
  })

  test('_id exists as id instead', async () => {
    const res = await helper.blogsInDb()

    assert.ok('id' in res[0])
  })
})

describe("HTTP POST test to /api/blogs url", () => {
  const newLength = helper.initialBlogs.length + 1
  const newBlog = {
    title: `test title ${newLength}`,
    author: `test author ${newLength}`,
    url: `testurl/${newLength}.com`,
    likes: newLength,
  }
  const badBlog = {
    author: `test author ${newLength}`,
    url: `testurl/${newLength}.com`,
    likes: newLength,
  }

  test("HTTP post is successful", async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    
    assert(Blog.exists({title: newBlog.title}))
  })

  test("length updated", async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)

    const res = await helper.blogsInDb() 
    
    assert.strictEqual(newLength, res.length)
  })

  test('missing required fields resolve 400', async () => {
  await api
    .post('/api/blogs')
    .send(badBlog)
    .expect(400)
  })

})

describe('Blog with missing likes property', () => {
  const newLength = helper.initialBlogs.length + 1
  const likeLessBlog = {
    title: `test title ${newLength}`,
    author: `test author ${newLength}`,
    url: `testurl/${newLength}.com`,
  }

  test('missing likes field accounted for', async () => {
    const res = await api
      .post('/api/blogs')
      .send(likeLessBlog)
      .expect(201)

    assert.ok('likes' in res._body)
  })
})

describe('HTTP delete request', () => {
  test('deleting one blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAfter = await helper.blogsInDb()
    assert(!blogsAfter.some(blog => blog.id === blogToDelete.id))
  })
})

describe('HTTP patch test', () => {
  test('patch on new like', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const changes = {
      likes: blogToUpdate.likes + 1
    }
    
    const res = await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(changes)
      .expect(204)
    
    assert.strict(blogToUpdate.likes + 1, res.body.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})