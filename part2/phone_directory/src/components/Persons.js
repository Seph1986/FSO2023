import React from 'react'
import Directory from './Directory'

const Persons = ({persons, filter}) => {
  return (
    <div>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person =>
            <Directory key={person.name} person={person} />
          )}
      </ul>
    </div>
  )
}

export default Persons