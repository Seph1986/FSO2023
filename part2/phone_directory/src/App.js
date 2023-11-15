import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServer from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
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


  // -- FETCH ALL PERSONS --
  useEffect(() => {
    personServer
      .getAllPersons()
      .then(res => {
        setPersons(res)
      })
  }, [])

  //  --  ------------  --


  // ADD OR MODIFY PERSON
  const submitControl = (event) => {
    event.preventDefault()
    const newData = {
      name: newName,
      number: newNumber
    }

    // CHECK IF DATA EXIST
    
    const person = persons.find(person => person.name === newData.name)
    const number = persons.find(person => person.number === newData.number)

    // CHANGE NUMBER
    if (person) {
      if (window.confirm(`${newName} already exist, replace the number with a new one ?`)) {
        personServer
          .updatePerson(person.id, newData)
          .then(res => setPersons(
            persons.map(per => per.id === res.id ? res : per)
          ))
      }
    }

    // CHANGE NAME
    else if (number) {
      if (window.confirm(`${newNumber} already exist,
        replace the name with a new one ?`)) {
        personServer
          .updatePerson(number.id, newData)
          .then(res => setPersons(
            persons.map(per => per.id === res.id ? res : per)
          ))
      }
    }

    // CREATE A NEW USER
    else {
      personServer
        .createPerson(newData)
        .then(person => {
          console.log(person)
          setPersons(persons.concat(person))
        })

      setNewName('')
      setNewNumber('')
    }
  }


  // DELETE A PERSON
  const deletePerson = (id) => {
    personServer
      .deletePerson(id)
      .then(res => console.log(`person with id ${id} deleted ...`))

    setPersons(persons.filter(person => person.id !== id))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add New</h2>
      <PersonForm submitControl={submitControl} newName={newName} handleInput={handleInput}
        newNumber={newNumber} handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App