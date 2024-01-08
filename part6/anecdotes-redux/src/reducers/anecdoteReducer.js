import { createSlice } from '@reduxjs/toolkit'

const anecdotesSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: [],
    reducers: {
      addAnecdote(state, action){
        console.log(typeof(action.payload.votes))
        state.push(action.payload)
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
      },
      setAnecdotes (state, action) {
        return action.payload
      }
    }
  }
)

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer