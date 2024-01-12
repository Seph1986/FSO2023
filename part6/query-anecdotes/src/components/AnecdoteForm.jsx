import { useMutation, useQueryClient } from 'react-query'
import { newAnecdote } from '../requests'
import { useNotificationDispatch } from '../Contexts/NotificaionContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(newAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({
        type: 'setNotification',
        payload: `anecdote created: "${newAnecdote.content}"`
      })
    },
    onError: (error) => {
      const errorMessage = error.response.data.error
      dispatch({ type: 'setNotification', payload: errorMessage })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
