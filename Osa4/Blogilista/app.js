const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleWare = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleWare.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleWare.unknownEndpoint)
app.use(middleWare.errorHandler)

module.exports = app