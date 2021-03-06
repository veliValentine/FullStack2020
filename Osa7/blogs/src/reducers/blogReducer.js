import blogService from '../services/blogs'

let id = 1

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data).sort(byLikes)
    case 'INIT_BLOGS':
      return action.data.sort(byLikes)
    case 'LIKE':
      const liked = action.data
      return state.map(b => b.id === liked.id ? liked : b).sort(byLikes)
    case 'REMOVE':
      const id = action.data
      return state.filter(b => b.id !== id).sort(byLikes)
    default:
      return state
  }
}

export const init = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    id = blogs.length
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const like = (blogObj) => {
  return async dispatch => {
    const toVote = { ...blogObj, likes: blogObj.likes + 1 }
    const data = await blogService.update(toVote.id, toVote)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    const removedId = await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: removedId
    })
  }
}

export const create = (blogObj) => {
  return async dispatch => {
    id = id + 1
    const blog = await blogService.create({
      title: blogObj.title,
      author: blogObj.author,
      url: blogObj.url,
      likes: 0,
      id
    })
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export default reducer