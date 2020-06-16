import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer.js'

const Blog = ({ blog, handleClick }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      <div>
        {blog.title} by {blog.author}
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}
        <button onClick={handleClick}>like</button>
      </div>
    </div>
  )
}

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          handleClick={() => {
            dispatch(like(blog))
            dispatch(notify(`liked ${blog.title} by ${blog.author}`, 3))
          }}
        />
      )}
    </div>
  )
}

export default BlogList