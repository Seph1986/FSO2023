// React import
import React, { useState, useEffect } from 'react'
// Moduls import
import noteService from './services/notes'
// Components import
import Note from './components/Note'
import Notification from './components/Notification'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


  // FETCHING ALL OF NOTES
  useEffect(() => {
    noteService
      .getAll()
      .then(res => {
        setNotes(res)
      })
  }, [])



  // POST A NEW NOTE
  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }


    noteService
      .create(noteObject)
      .then(response => {
        console.log(response)

        setNotes(notes.concat(response))
        setNewNote('')
      })
  }


  // CHANGE IMPORTANCE
  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const mofiedNote = {...note, important: !note.important}

    noteService
      .update(mofiedNote.id, mofiedNote)
      .then(res =>{
        setNotes(notes.map(note => note.id !== id ? note : res))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }


  // HANDLE THE VALUE CHANGE OF newNote
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  // NOTE FILTER (SHOW ALL OR JUST IMPORTANT)
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input
          type='text'
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App 