import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const sorted = (arr) => {
  return arr.sort((a, b) => b.votes - a.votes)
}

const anecdotesSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: [],
    reducers: {
      addAnecdote(state, action) {
        state.push(action.payload)
      },
      updateAnecdote(state, action) {
        const anecdoteChanged = action.payload
        const toReturn = state.map(anecdote => anecdote.id !== anecdoteChanged.id
          ? anecdote
          : anecdoteChanged)

        return sorted(toReturn)
      },
      setAnecdotes(state, action) {
        return sorted(action.payload)
      }
    }
  }
)

export const { addAnecdote, updateAnecdote, setAnecdotes } = anecdotesSlice.actions

export const createAnecdote = content => {
  return async dispatch => {
    const object = { content, votes: 0 }
    const newAnecdote = await anecdotesService.create(object)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes

    const findAnecdote = state.find(anecdote => anecdote.id === id)
    const anecdoteChanged = {
      ...findAnecdote,
      votes: findAnecdote.votes + 1
    }

    const anecdote = await anecdotesService.update(anecdoteChanged)
    dispatch(updateAnecdote(anecdote))
  }
}

export default anecdotesSlice.reducer