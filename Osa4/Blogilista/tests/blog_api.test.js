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

afterAll(() => {
  mongoose.connection.close()
})