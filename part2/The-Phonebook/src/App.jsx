import { useState, useEffect } from 'react'
import personServices from './services/persons'
import Persons from './components/Persons'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'
import Status from './components/Status'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [status, setStatus] = useState({type: "success" , message: "nothing to report"})

  useEffect(() => {
    personServices.getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  } ,[])

  const setDefaultStatus = () => setStatus({type: 'success', message: 'nothing to report'})

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

    if (persons.some(person => person.number === newNumber)) {
        setStatus({
          type: "failure",
          message: 
          `${persons.find(person => person.number === newNumber).name} already has ${newNumber} in the phonebook`
        })
        setTimeout(setDefaultStatus, 5000)
  } else if (persons.some(person => person.name === newName) 
      && persons.some(person => person.number !== newNumber)){
        console.log(persons.find(person => person.name === newName).id)
        console.log(newPerson)
        if (window.confirm(`${newName} is already in the phonebook, update their number?`)) {
          personServices
            .update(persons.find(person =>
              person.name === newName
              ).id, newPerson)
            .then(response => {
              console.log(response)
              setPersons(persons.map(person => person.id === response.id 
                ? response : person
              ))
              setStatus({
                type: "success",
                message: `added ${newNumber} to ${newName}`})
              setTimeout(setDefaultStatus, 3000)
              setNewName('')
              setNewNumber('')
          })
            .catch(error => {
              console.log(error)
              setPersons(persons.filter(person => person.name !== newName))
              setStatus({
              type: "failure",
              message: `Information of ${newName} 
                has already been removed from the server`})
              setTimeout(setDefaultStatus, 3000)
            })
        } else {
          setStatus({
            type: "failure",
            message: `${newName}'s number remains unchanged`})
          setTimeout(setDefaultStatus, 3000)
        }
  } else {
      personServices
        .create(newPerson)
        .then(response => {
          console.log(response)
          setStatus({
            type: "success",
            message: `added ${newName}`})
          setTimeout(setDefaultStatus, 3000)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
      }) 
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this person")){
    personServices.remove(id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id !== response.id))
        setStatus({
        type: "success",
        message: `Information of ${persons.find(person => person.id === id).name} 
          has been removed from the server`})
        setTimeout(setDefaultStatus, 3000)
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== response.id))
        setStatus({
        type: "failure",
        message: `Information of ${persons.find(person => person.id === id).name} 
          has already been removed from the server`})
        setTimeout(setDefaultStatus, 3000)
      })
    } else {
      setStatus({
        type: "failure",
        message: `Removal of ${persons.find(person => person.id === id).name} canceled`})
      setTimeout(setDefaultStatus, 3000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Status type={status.type} message={status.message}/>
      <Phonebook search={newSearch} change={handleSearchChange} />
      <h2>add a new Person</h2>
      <PersonForm name={newName} number={newNumber} 
                  nameChange={handleNameChange} numberChange={handleNumberChange}
                  addPerson={addPerson} />
      <h2>Numbers</h2>
      {newSearch.length > 0 ?  <Persons persons={filteredPersons} onClick={handleDelete}/> 
                            :  <Persons persons={persons} onClick={handleDelete}/>}
    </div>
  )
}

export default App