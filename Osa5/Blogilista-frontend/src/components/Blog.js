import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
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
      blog.likes = blog.likes + 1
      const newBlog = await blogService.update(blog.id, blog)
      
    } catch (e) {
      console.error('failed to add like', { blog })
    }
  }

  const user = typeof blog.user !== String
    ? blog.user : console.log('nimi on id')

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
      </div>
    </div>
  )
}

export default Blog
