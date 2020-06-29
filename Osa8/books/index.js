require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]
//Author.insertMany(authors)
/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
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

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ):Book,
    editAuthor(name: String!, setBornTo: Int!):Author
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    allAuthors: [Author!]!
    authorCount: Int!
  }
`

const JWT_KEY = process.env.KEY

const resolvers = {
  Query: {
    allBooks: () => Book.find({}),//Ei löydä authoria
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    authorCount: () => Author.collection.countDocuments(),
  },
  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({ name })
      const books = await Book.find({ author })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, { author, ...args }) => {
      let bookAuthor = await Author.findOne({ name: author })
      if (!bookAuthor) {
        bookAuthor = new Author({
          name: author,
        })
        bookAuthor.save()
      }
      const book = new Book({ ...args, author: bookAuthor })
      return book.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    editAuthor: async (root, { name, setBornTo }) => {
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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})