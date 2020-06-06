import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createMessage, clearMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .filter(a =>
      a.content.toLowerCase()
        .includes(filter.toLowerCase())
    )

  const sortByLikes = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
      {anecdotes.sort(sortByLikes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote.id))
            dispatch(createMessage(`you voted '${anecdote.content}'`))
            setTimeout(() => {
              dispatch(clearMessage())
            }, 5000)
          }
          }
        />
      )
      }
    </div>
  )
}

export default AnecdoteList