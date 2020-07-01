import React, { useEffect, useState } from 'react'
import { ME, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = ({ show, token }) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ME)
  const data = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  useEffect(() => {
    result.refetch()
  }, [token]) // eslint-disable-line

  useEffect(() => {
    if (result.data && result.data.me !== null) {
      setGenre(result.data.me.favoriteGenre)
    }
  }, [result])

  if (!show) {
    return null
  }

  if (result.loading || data.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const books = data.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>
      {books.length === 0 ?
        <p>no books in favorite genre</p>
        :
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
            </th>
              <th>
                published
            </th>
            </tr>
            {books.map(a =>
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>}
    </div>
  )
}

export default Recommend