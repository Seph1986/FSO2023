import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  // HANDLE TEXT INPUT
  const handleInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  // HANDLE NUMBER INPUT
  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  // HANDLE FILTER INPUT
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  // CREATE THE NEW PERSON 
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} already exist`)
    }
    else if(persons.some(person => person.number === newNumber)){
      alert(`${newNumber} already exist`)
    }
    else{
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add New</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleInput={handleInput}
        newNumber={newNumber} handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App