const express = require('express')
const app = express()

const PORT = 3001
const BASE_URL = "api/persons"

const phonebook = [
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

app.get('/', (req, res) => {
  res.send('<h1 align="center">Hello World</h1>')
})

app.get(`/${BASE_URL}`, (req, res) => {
  res.json(phonebook)
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<div><p>Phonebook has info for ${phonebook.length} people</p><p>${date.toString()}</p></div>`)
})

app.listen(PORT, () => {
  console.log(`Phonebook listening on port ${PORT}`)
})