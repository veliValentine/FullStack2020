import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notifications from './components/Notifications'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (e) {
      setError(true)
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 2000)
    }
  }

  const loginForm = () => (
    <LoginForm loginUser={login} message={message} error={error} />
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const addedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(addedBlog))
    setError(false)
    setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const blogFormRef = React.createRef()

  const content = () => (
    <div>
      <h2>blogs</h2>
      <Notifications message={message} error={error} />
      <LogoutForm blogService={blogService} user={user} setUser={setUser} />
      <Toggable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggable>
      {blogs.sort(sortByLikes).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} loggedUser={user} />
      )}
    </div>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : content()
      }
    </div>
  )
}

export default App