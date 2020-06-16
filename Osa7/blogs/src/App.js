import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import { init } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(init())
  }, [dispatch])

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <BlogList />
      <BlogForm />
    </div>
  )
}

export default App