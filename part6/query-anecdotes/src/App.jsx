import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, changeAnecdote } from './requests'
import { useNotificationDispatch } from './Contexts/NotificaionContext'

const App = () => {
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation(changeAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const newAnecdotes = anecdotes.map(anecdote => {
        return anecdote.id !== newAnecdote.id
          ? anecdote
          : newAnecdote
      })
      queryClient.setQueryData('anecdotes', newAnecdotes)
    }
  })
  
  const dispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'setNotification',
      payload: `Anecdote voted: ${anecdote.content}`
    })
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false
  })
  console.log(result)

  if (result.isLoading) {
    return <div>loading ... </div>
  }

  if (result.isError) {
    return <div>Anecdote error not avalible due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
