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

const filterAuthor = (blog, author) => {
  return blog.author === author
}

const mostBlogs = (blogs) => {
  let author
  blogs.forEach(blog => {
    author = author || { author: blog.author, blogs: 0 }
    const n = blogs.filter(b => filterAuthor(b, author.author)).length
    author = n < author.blogs ? author : { author: blog.author, blogs: n }
  })

  return author === undefined ? {} : author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}