import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, loggedUser }) => {
  const [showAll, setShowAll] = useState(false)
  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const addLike = async () => {
    try {
      const blogObject = {
        ...blog,
        likes: blog.likes + 1,
      }
      await blogService.update(blog.id, blogObject)
      setBlogs(blogs.map(b => b.id !== blogObject.id ? b : blogObject))
    } catch (e) {
      console.error('failed to add like', { blog })
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (e) {
        console.error('Poistaminen ei onnistu')
      }
    }
  }

  const user = typeof blog.user !== String
    ? blog.user : console.error('nimi on id')

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes}
        <button onClick={addLike}>like</button>
        <br />
        {user.name}
        <br />
        {user.id !== loggedUser.id
          ? null
          : <button onClick={deleteBlog}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
