import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}> {props.text} </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setNewValue = (newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <Button handleClick={()=> setNewValue(1000)} text='thousand' />
      <Button handleClick={() => setNewValue(0)} text='reset' />
      <Button handleClick={() => setNewValue(value+1)} text='increment' />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)