import React from 'react'

const Directory = ({ person }) => {
    return <li><strong>name: </strong>{person.name}; <strong>number: </strong>{person.number}
    </li>
  }

export default Directory