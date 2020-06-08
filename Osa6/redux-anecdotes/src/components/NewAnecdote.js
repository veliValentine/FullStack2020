import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createMessage, clearMessage } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(createMessage(`new anecdote '${newAnecdote.content}'`))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewAnecdote