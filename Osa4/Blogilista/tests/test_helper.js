const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Me',
    author: 'I',
    url: 'www.i.com',
    likes: 0
  },
  {
    title: 'Me2',
    author: 'I2',
    url: 'www.i2.com',
    likes: 2
  },
]

const nonExsistingId = async () => {
  const blog = new Blog({ title: 'A', author: 'B', url: 'C' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  nonExsistingId,
  blogsInDB
}