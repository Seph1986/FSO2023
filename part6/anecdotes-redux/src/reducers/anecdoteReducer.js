import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice(
  {
    name: 'anecdotes',
    initialState,
    reducers: {
      addAnecdote(state, action){
        const newAnecdote = asObject(action.payload)
        return [...state, newAnecdote]
      },
      voteAnecdote(state, action){
        const id = action.payload
        const findAnecdote = state.find(anecdote => anecdote.id === id)
        const anecdoteChanged = {
          ...findAnecdote, 
          votes: findAnecdote.votes + 1
        }
        const toReturn = state.map(anecdote => anecdote.id !== id 
          ? anecdote
          : anecdoteChanged)
        
        return toReturn.sort((a, b) => b.votes - a.votes)
      }
    }
  }
)

export const { addAnecdote, voteAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer