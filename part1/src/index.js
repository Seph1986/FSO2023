import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({handler,text}) => (
  <button onClick={handler}>{text}</button>
)

const App = () => {
  const [good, goodAction] = useState(0)
  const [neutral, neutralAction] = useState(0)
  const [bad, badAction] = useState(0)


  return (
    <div>
      <Title title='give feedback' />
      <Button handler={()=>goodAction(good + 1)} text='good' />
      <Button handler={()=>neutralAction(neutral + 1)} text='neutral' />
      <Button handler={()=>badAction(bad + 1)} text='bad' />
      <Title title='statistics' />
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)