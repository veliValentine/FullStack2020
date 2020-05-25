import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notifications from './components/Notifications'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const Logout = ({ blogService, user, setUser }) => {
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

const BlogForm = ({ blogs, setBlogs, setMessage, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    const addedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(addedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setError(false)
    setMessage(`a new blog ${title} by ${author}`)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setError(true)
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 2000);
    }
  }

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notifications message={message} error={error} />
      <div>
        username
      <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
      <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const content = () => (
    <div>
      <h2>blogs</h2>
      <Notifications message={message} error={error} />
      <Logout blogService={blogService} user={user} setUser={setUser} />
      <Toggable buttonLabel="new note">
        <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setError={setError} />
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