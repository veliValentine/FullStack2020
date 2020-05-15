const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = blogs.reduce((sum, blog) => {
    return sum += blog.likes
  },0)

  return totalLikes
}

module.exports = {
  dummy,
  totalLikes,
}