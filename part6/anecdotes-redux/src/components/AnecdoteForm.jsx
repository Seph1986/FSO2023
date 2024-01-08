import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { printNotification } from '../reducers/notificationReducer'

import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteAdded = await anecdotesService.create(content)

    dispatch(addAnecdote(anecdoteAdded))
    dispatch(printNotification(`anecdote "${content}" added`))
    setTimeout(() => {
      dispatch(printNotification(''))
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm