import React from 'react'

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.submitControl}>
        <div>
          name: <input
            type='text'
            value={props.newName}
            onChange={props.handleInput}
          />
        </div>
        <div>
          number: <input
            type='text'
            value={props.newNumber}
            onChange={props.handleNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm