import React from 'react'

const LogoutForm = ({ blogService, user, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <form onSubmit={logout}>
      {user.name} logged in
      <button type="submit">logout</button>
    </form>
  )
}

export default LogoutForm