import React, { useState } from 'react'
import Notifications from './Notifications'


const LoginForm = ({ loginUser, message, error }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    loginUser({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>log in to application</h2>
      <Notifications message={message} error={error} />
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="current-password"
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

export default LoginForm