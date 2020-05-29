import React, { useState } from 'react'
import PropTypes from 'prop-types'

const UserInfo = ({ user, loggedUser, deleteBlog }) => (
  <div className="userInfo">
    {user.name}
    <br />
    {user.id !== loggedUser.id
      ? null
      : <button onClick={deleteBlog}>remove</button>
    }
  </div>
)

const Likes = ({ likes, addLike }) => (
  <div className="likes">
    likes {likes}
    <button onClick={addLike}>like</button>
  </div>
)

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog }) => {
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

  console.log(blog.user)
  const user = typeof blog.user !== String
    ? blog.user : null

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="hiddenBlog">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="blogInfo">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <Likes likes={blog.likes} addLike={likeBlog} />
        <UserInfo user={user} loggedUser={loggedUser} deleteBlog={deleteBlog} />
      </div>
    </div>
  )
}

Blog.prototypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.isRequired
}

export default Blog
