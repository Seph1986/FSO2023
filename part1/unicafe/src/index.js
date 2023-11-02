import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({handler,text}) =>(
  <button onClick={handler} >{text}</button>
)

const StatisticLine = ({text,value}) => {
  return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  
  if (props.all === 0) return <h3>No feedback given</h3>

  return(
    <div>
      <h1>statisctics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good}/>
          <StatisticLine text='neutral' value={props.neutral} /> 
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.all} /> 
          <StatisticLine text='average' value={props.avg} /> 
          <StatisticLine text='positive' value={props.pos} /> 
        </tbody>
      </table>
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0) 
  const [avg, setAvg] = useState(0)
  const [pos, setPositive] = useState(0)


  const handleGood = () =>{
    setGood(good + 1)
    setAll(all + 1)
    setAvg(((good +1)-bad)/(all + 1))
    setPositive(( (good + 1) * 100 ) / (all + 1))
  }

  const handleNeutral = () =>{
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAvg((good-bad)/(all + 1))
    setPositive(( good * 100 ) / (all + 1))
  }
  
  const handleBad = () =>{
    setBad(bad + 1)
    setAll(all + 1)
    setAvg((good-(bad + 1))/(all + 1))
    setPositive(( good * 100 ) / (all + 1))
  }

  return (
    <div>
      <Title title='give feedback' />
      <Button handler={handleGood} text='good' />
      <Button handler={handleNeutral} text='neutral' />
      <Button handler={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)