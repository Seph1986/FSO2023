import { useState, useEffect } from 'react'
// Services import
import blogService from './services/blogs'
import loginUser from './services/login'
// Components Import
import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogPost from './components/BlogPost'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const BlogPostHandler = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    const response = await blogService.createBlog(newBlog)

    blogs.push(response)

    setMessage(`New blog ${title} by ${author}`)
    setMessageType('success')
    setTitle('')
    setAuthor('')
    setUrl('')

    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
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
          <BlogPost title={title} setTitle={setTitle} author={author} setAuthor={setAuthor}
            url={url} setUrl={setUrl} BlogPostHandler={BlogPostHandler}
          />
          <BlogList blogs={blogs} userName={user.name} logoutHandler={logoutHandler} />
        </>
      }
    </div>
  )
}

export default App