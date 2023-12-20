import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogPost = ({ blogPostHandler }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }

    blogPostHandler(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name='Title'
          ></input>
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name='Author'
          ></input>
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name='Url'
          ></input>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

BlogPost.propTypes = {
  blogPostHandler: PropTypes.func.isRequired
}


export default BlogPost