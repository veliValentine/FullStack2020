const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CLEAR':
      return null
    case 'SET':
      return action.message
    default:
      return state
  }
}

let id
export const notify = (message, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET',
      message
    })
    clearTimeout(id)
    id = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default reducer