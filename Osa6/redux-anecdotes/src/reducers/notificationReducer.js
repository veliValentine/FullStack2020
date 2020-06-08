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

export const setNotification = (message, time) => {
  return async dispatch => {
    await dispatch({
      type: 'MESSAGE',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default reducer