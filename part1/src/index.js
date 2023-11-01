import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({handler,text}) =>(
  <button onClick={handler} >{text}</button>
)

const Display = ({text,number}) => <div>{text} {number}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0) 
  const [avg, setProm] = useState(0)
  const [pos, setPositive] = useState(0)


  const handleGood = () =>{
    setGood(good + 1)
    setAll(all + 1)
    setProm(avg + 1)
    setPositive(( (good + 1) * 100 ) / (all + 1))
  }

  const handleNeutral = () =>{
    setNeutral(neutral + 1)
    setAll(all + 1)
    setProm((avg + 0))
    setPositive(( good * 100 ) / (all + 1))
  }
  
  const handleBad = () =>{
    setBad(bad + 1)
    setAll(all + 1)
    setProm(avg - 1)
    setPositive(( good * 100 ) / (all + 1))
  }

  return (
    <div>
      <Title title='give feedback' />
      <Button handler={handleGood} text='good' />
      <Button handler={handleNeutral} text='neutral' />
      <Button handler={handleBad} text='bad' />
      <Title title='statistics' />
      <Display text='good' number={good} />
      <Display text='neutral' number={neutral} />
      <Display text='bad' number={bad} />
      <Display text='all' number={all} />
      <Display text='average' number={avg} />
      <Display text='positive' number={pos} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)