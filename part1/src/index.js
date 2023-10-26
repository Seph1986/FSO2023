import React, { useState } from 'react'
import ReactDOM from 'react-dom'
 
const Display = ({counter}) => <div>{counter}</div>


const MyButton = ({handleClick, text}) => {
  return <button onClick={handleClick}>
    {text}
    </button>
}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  
  const increaseByOne = () => setCounter(counter + 1)
  const decreseByOne = () => setCounter(counter -1)
  const restart = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <MyButton handleClick={increaseByOne} text={'PRUS URTRA'} />
      <MyButton handleClick={decreseByOne} text={'Minus One'} />
      <MyButton handleClick={restart} text={'HARD RESET FROM FRACTORY'} />
      
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)