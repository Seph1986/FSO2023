import React from "react";

const BlogPost = ({ BlogPostHandler, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={BlogPostHandler}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="Title"
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="Author"
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="Url"
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogPost