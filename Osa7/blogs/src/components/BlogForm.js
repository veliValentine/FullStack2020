import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    dispatch(create({
      title,
      author,
      url
    }))
    dispatch(notify(`new blog ${title} by ${author}`, 3))
  }

  return (
    <form onSubmit={handleSubmit}>
      title: <input name="title" />
      <br />
      author: <input name="author" />
      <br />
      url: <input name="url" />
      <br />
      <button type="submit">add a blog</button>
      <button type="reset">reset</button>
    </form>
  )
}

export default BlogForm