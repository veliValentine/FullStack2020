const reducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      const message = action.data.message
      return message
    case 'CLEAR':
      return state = null
    default:
      return state
  }
}

let id
export const setNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(id)
    await dispatch({
      type: 'MESSAGE',
      data: { message }
    })
    id = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default reducer