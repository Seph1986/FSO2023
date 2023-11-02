import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    new Array(props.anecdotes.length).fill(0)
  )
  console.log(props)

  const randomAnecdote = () =>{
    let number = Math.floor(Math.random() * (props.anecdotes.length))
    
    return setSelected(number)
  }

  const addPoints = (number) =>{
    return () => {
      let newArray = [...points]
      newArray[number] += 1

      return setPoints(newArray)
    }
  }

  const mostVotedAnecdote = () =>{
    let max = Math.max(...points)
    return points.indexOf(max)
  }

  const mostVotedIndex = mostVotedAnecdote();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        <p>{props.anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
      </div>
      <div>
        <button onClick={randomAnecdote}>Next anecdote</button>
        <button onClick={addPoints(selected)}>Vote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>
        <p>{props.anecdotes[mostVotedIndex]}</p>
        <p>{points[mostVotedIndex]}</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)