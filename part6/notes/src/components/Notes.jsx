import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import PropTypes from 'prop-types'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {

  const notes = useSelector(({ filter, notes }) => {
    if ( filter === 'ALL' ) {
      return notes
    }
    return filter  === 'IMPORTANT' 
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const dispatch = useDispatch()

  return(
    <ul>
    {notes.map(note =>
      <Note
        key={note.id}
        note={note}
        handleClick={() => 
          dispatch(toggleImportanceOf(note.id))
        }
      />
    )}
  </ul>
  )
}

Note.propTypes = {
  note: PropTypes.any.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Notes