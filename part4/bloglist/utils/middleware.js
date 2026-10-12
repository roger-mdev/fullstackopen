const logger =  require('./logger')

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'CastError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }

  next(err)
}

module.exports = {
  errorHandler
}