import React, { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const button = visible ? 'hide' : 'show'
  const showWhenVisible = visible ? '' : 'none'
  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonRemove = {
    background: '#69B3E7',
    border: 'solid',
    borderRadius: '10px',
    borderWidth: 1
  }

  return (
    <>
      <div style={blogStyle}>
        {blog.title}; <strong>{blog.author}</strong>
        <button onClick={() => setVisible(!visible)}>{button}</button>
        <div style={{ display: showWhenVisible }}>
          {blog.url}
          <br></br>
          {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
          <br></br>
          {blog.user.name}
          <br></br>
          {blog.user.username === user.username &&
            <button
              style={buttonRemove}
              onClick={() => handleDelete(blog)}>
              remove
            </button>
          }
        </div>
      </div>
    </>
  )
}



export default Blog