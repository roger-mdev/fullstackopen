require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-lenght'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

const PORT = process.env.PORT
const BASE_URL = 'api/persons'

app.get('/', (req, res) => {
  res.send('<h1 align="center">Hello World</h1>')
})

app.get(`/${BASE_URL}`, (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error))
})

app.get(`/${BASE_URL}/:id`, (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => res.json(person))
    .catch(error => next(error))
})

app.delete(`/${BASE_URL}/:id`, (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(person => {
      console.log(`entry for ${person.name} was removed`)
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post(`/${BASE_URL}`, async (req, res, next) => {
  try {
    const body = req.body
    if(!body.name || !body.number) {
      return res.status(400).json({ error : 'body missing' })
    }

    const numberExists = await Person.findOne({ number: body.number })
    if(numberExists) {
      return res.status(400).json({ error: 'that number already exists under a different person' })
    }

    const personExists = await Person.findOne({ name: body.name })
    if (personExists) {
      const updatedPerson = await Person.findByIdAndUpdate(personExists.id, { number: body.number }, { returnDocument: 'after', runValidators: true })
      res.json(updatedPerson)
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      })

      const saved = await person.save()
      res.json(saved)
    }
  } catch (error) {
    next(error)
  }
})

app.get('/info', (req, res, next) => {
  const date = new Date()
  Person.find({})
    .then(phonebook =>
      res.send(`<div><p>Phonebook has info for ${phonebook.length} people</p><p>${date.toString()}</p></div>`)
    )
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === 'DocumentNotFoundError') {
    return res.status(404).send({ error: 'person not found' })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Phonebook listening on port ${PORT}`)
})