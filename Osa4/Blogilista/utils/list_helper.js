const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = blogs.reduce((sum, blog) => {
    return sum += blog.likes
  }, 0)

  return totalLikes
}

const favoriteBlog = (blogs) => {
  let blogWithMostLikes
  blogs.forEach(blog => {
    blogWithMostLikes = blogWithMostLikes || blog
    blogWithMostLikes = blog.likes > blogWithMostLikes.likes ? blog : blogWithMostLikes
  })

  return blogWithMostLikes === undefined ? {} : blogWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}