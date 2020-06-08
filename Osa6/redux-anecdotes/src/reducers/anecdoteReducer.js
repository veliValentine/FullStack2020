import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      const newAnecdote = action.data
      return state.concat(newAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const changedAnecdote = action.data
      return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    const anecdote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const changedAnecdote = await anecdotesService.update(id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export default reducer