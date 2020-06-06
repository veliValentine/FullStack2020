const reducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      const message = action.data.message
      return state = message
    case 'CLEAR':
      return state = null
    default:
      return state
  }
}

export const createMessage = (content) => {
  return {
    type: 'MESSAGE',
    data: { message: content }
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer