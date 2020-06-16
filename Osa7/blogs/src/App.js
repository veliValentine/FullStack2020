import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { init } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const s = useSelector(s => s)
  console.log({ s })
  useEffect(() => {
    dispatch(init())
  }, [dispatch])

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <BlogList />
    </div>
  )
}

export default App