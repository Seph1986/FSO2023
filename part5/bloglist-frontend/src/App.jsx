import { useState, useEffect } from 'react'
// Services import
import blogService from './services/blogs'
import loginUser from './services/login'
// Components Import
import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogPost from './components/BlogPost'
import Message from './components/Message'
import Toggable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(res => setBlogs(res))
  }, [])

  useEffect(() => {
    const checkUser = window.localStorage.getItem('loggedBlogappUser')
    if (checkUser) {
      const user = JSON.parse(checkUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const loginHandler = async (event) => {
    try {
      event.preventDefault()
      const user = await loginUser({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
      setUser(user)
      blogService.setToken(user.token)
    }
    catch (exception) {
      console.log(exception)
      setMessage('Wrong username or password')
      setMessageType('error')

      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const blogPostHandler = async (newBlog) => {

    const response = await blogService.createBlog(newBlog)

    blogs.push(response)

    setMessage(`New blog ${response.title} by ${response.author}`)
    setMessageType('success')

    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updatedBlog.user = blog.user.id
    delete updatedBlog.id

    const response = await blogService.updateBlog(blog.id, updatedBlog)

    if (response) {
      const newBlogList = blogs.map((blog) => {
        return blog.id === response.id ? response : blog
      })

      setBlogs(newBlogList)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`)){
      await blogService.deleteBlog(blog.id)

      const newBlogList = blogs.reduce((acc, current) => {
        if(current.id !== blog.id) acc.push(current)
        return acc
      }, [])

      setBlogs(newBlogList)

      setMessage(`${blog.title} deleted`)
      setMessageType('success')

      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null &&
        <>
          {message !== null &&
            <Message message={message} messageType={messageType} />
          }
          <Login
            setUsername={setUsername} setPassword={setPassword}
            username={username} password={password} loginHandler={loginHandler}
          />
        </>
      }

      {user !== null &&
        <>
          <div>
            <p style={{ display: "inline-block", marginRight: "5px" }}>
              <strong>{user.username}</strong>
              logged in
            </p>
            <button onClick={logoutHandler}>logout</button>
          </div>
          {message !== null &&
            <Message message={message} messageType={messageType} />
          }
          <Toggable label='new blog'>
            <BlogPost
              blogPostHandler={blogPostHandler}
            />
          </Toggable>
          <BlogList 
            blogs={blogs}
            handleLike={handleLike}
            user={user}
            handleDelete={handleDelete}
          />
        </>
      }
    </div>
  )
}

export default App