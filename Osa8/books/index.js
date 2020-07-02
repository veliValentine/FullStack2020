require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    allAuthors: [Author!]!
    authorCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ):Book,
    editAuthor(
      name: String!, 
      setBornTo: Int!
    ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const JWT_KEY = process.env.KEY

const resolvers = {
  Query: {
    allBooks: (root, { genre }) => {
      if (!genre) {
        return Book.find({}).populate('author')
      }
      return Book.find({ genres: { $in: genre } }).populate('author')
    },
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    authorCount: () => Author.collection.countDocuments(),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({ name })
      const books = await Book.find({ author })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, { author, ...args }, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let bookAuthor = await Author.findOne({ name: author })
      if (!bookAuthor) {
        bookAuthor = new Author({
          name: author,
        })
        bookAuthor.save()
      }
      const book = new Book({ ...args, author: bookAuthor })

      try {
        await book.save()
      } catch (e) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, { name, setBornTo }, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name })
      if (!author) {
        return null
      }
      author.born = setBornTo
      try {
        await author.save()
      } catch (e) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(e => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salainen') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_KEY) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}
//8.15 mutaatioiden validointivirheet käsitellään
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_KEY
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})