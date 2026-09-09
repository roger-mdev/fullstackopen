const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  if ( process.env.NODE_ENV !== 'test' ) {
    logger.info(req.body)
  }
  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRouter