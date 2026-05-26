import { useState } from 'react'
import Persons from './components/Persons'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearch(value)
    setFilteredPersons(persons.filter(person =>
    person.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName) 
      || persons.some(person => person.number === newNumber)) {
      alert(`${newName} or number: ${newNumber} is already added to phonebook`)
    }

    else {
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')}
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook search={newSearch} change={handleSearchChange} />
      <h2>add a new Person</h2>
      <PersonForm name={newName} number={newNumber} 
                  nameChange={handleNameChange} numberChange={handleNumberChange}
                  addPerson={addPerson} />
      <h2>Numbers</h2>
      {newSearch.length > 0 ?  <Persons persons={filteredPersons} /> 
                            :  <Persons persons={persons}/>}
    </div>
  )
}

export default App