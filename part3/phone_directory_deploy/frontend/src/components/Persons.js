import React from 'react'
import Directory from './Directory'

const Persons = ({persons, filter, deletePerson}) => {
  
  return (
    <div>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person =>
            <li key={person.name}>
              <Directory person={person} deletePerson={deletePerson}/> 
            </li>
            )}
      </ul>
    </div>
  )
}

export default Persons