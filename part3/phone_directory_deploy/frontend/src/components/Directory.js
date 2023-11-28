import React from 'react'

const Directory = ({ person, deletePerson}) => {
    return <p>
      <strong>name: </strong>{person.name} <strong>number: </strong>{person.number}
      <button onClick={()=> {
          if(window.confirm(`Delete ${person.name} ?`))
            deletePerson(person.id)
        }}>Delete Person</button>
    </p>
  }

export default Directory