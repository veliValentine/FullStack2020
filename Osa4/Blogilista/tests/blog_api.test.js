const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const URL = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('GETting blogs ', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get(URL)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(URL)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs contain field id', async () => {
    const response = await api.get(URL)
    const fieldID = response.body.map(b => b.id)
    expect(fieldID).toBeDefined()
  })

  test('blogs contain id instead of _id', async () => {
    const blogs = await helper.blogsInDB()
    const blog = blogs[0]

    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

describe('POSTing blogs ', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      author: 'author',
      title: 'title',
      url: 'url',
      likes: 5
    }

    await api
      .post(URL)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    const authors = blogsAtEnd.map(b => b.author)
    const url = blogsAtEnd.map(b => b.url)
    const likes = blogsAtEnd.map(b => b.likes)

    expect(titles).toContain(newBlog.title)
    expect(authors).toContain(newBlog.author)
    expect(url).toContain(newBlog.url)
    expect(likes).toContain(newBlog.likes)
  })

  test('a blog without likes can be added', async () => {
    const newBlog = {
      author: 'author',
      title: 'title',
      url: 'url'
    }

    await api
      .post(URL)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('blog without author is not added', async () => {
    const newBlog = {
      title: 'title',
      url: 'url',
      likes: 5
    }

    await api
      .post(URL)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'author',
      url: 'url',
      likes: 5
    }

    await api
      .post(URL)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without URL is not added', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      likes: 5
    }

    await api
      .post(URL)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})