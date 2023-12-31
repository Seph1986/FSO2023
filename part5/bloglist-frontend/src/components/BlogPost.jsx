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
    <div className='BlogForm'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name='Title'
          ></input>
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name='Author'
          ></input>
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name='Url'
          ></input>
        </div>
        <button id='create-blog' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogPost.propTypes = {
  blogPostHandler: PropTypes.func.isRequired
}


export default BlogPost