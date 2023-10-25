import React from 'react'
import ReactDOM from 'react-dom'

const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

const Greeting = (props)=>{
  return(
    <div>
      <h3>HELLO YOU BASTARD {props.name}</h3>
      <br />
      <br />
    </div>

  )
}


const Formal = (props) =>{
  return(
    <div>
      <h2>Hi my name is {props.name}, I'm {props.age} years old and I'm from {props.city}</h2>
    </div>
  )
} 

const App = () => {

  let myName = 'Apolo'
  let myAge = 3

  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
      <Greeting name="ENZO"/>
      <Greeting name="JOSÉ" />
      <Formal name={myName} age={myAge} city={'Hohenau'} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))