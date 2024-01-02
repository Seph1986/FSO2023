import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ loginHandler, setUsername, setPassword, username, password }) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
        <div>
          username:
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => { setUsername(target.value) }}
          >
          </input>
        </div>
        <div>
          password:
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => { setPassword(target.value) }}
          >
          </input>
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </>
  )
}

Login.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login