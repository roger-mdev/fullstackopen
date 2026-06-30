const express = require('express')
const morgan = require('morgan')
const app = express()

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


const PORT = process.env.PORT || 3001
const BASE_URL = "api/persons"

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const genId = () => {
  let randId = 0
  do {
    randId = Math.floor(Math.random() * (123456 - 0 + 1))
  } while (phonebook.some(p => p.id === randId))

  return randId
}

app.get('/', (req, res) => {
  res.send('<h1 align="center">Hello World</h1>')
})

app.get(`/${BASE_URL}`, (req, res) => {
  res.json(phonebook)
})

app.get(`/${BASE_URL}/:id`, (req, res) => {
  const id = req.params.id
  const person = phonebook.find(p => p.id === id)
  console.log(person)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete(`/${BASE_URL}/:id`, (req, res) => {
  const id = req.params.id
  phonebook = phonebook.filter(p => p.id !== id)
  res.status(204).end()
})

app.post(`/${BASE_URL}`, (req, res) => {
  const person = req.body
  if (phonebook.some(p => p.name === person.name)) {
    res.status(409)
    return res.json({error: 'name must be unique'})
  }

  if (!( person.name || false ) || !( person.number || false )) {
    res.status(402)
    return res.json({error: 'name or number missing from request'})
  }
  
  const personObj = { 
    name: person.name,
    number: person.number,
    id: genId(),
  }

  phonebook = phonebook.concat(personObj)
  res.status(200)
  res.json(personObj)
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<div><p>Phonebook has info for ${phonebook.length} people</p><p>${date.toString()}</p></div>`)
})

app.listen(PORT, () => {
  console.log(`Phonebook listening on port ${PORT}`)
})