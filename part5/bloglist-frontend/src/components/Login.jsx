import React from "react";

const Login = ({loginHandler, setUsername, setPassword, username, password }) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
        <div>
          username: 
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => { setUsername(target.value) }}
          >
          </input>
        </div>
        <div>
          password: 
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => { setPassword(target.value) }}
          >
          </input>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default Login