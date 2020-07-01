import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [filter, setFilter] = useState('all genres')

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>)
  }

  const books = result.data.allBooks

  let genres = []
  books.forEach(b => genres = genres.concat(b.genres))
  genres = [...new Set(genres)].concat('all genres')


  return (
    <div>
      <h2>books</h2>
      {filter === 'all genres' ?
        <></> :
        <>
          <p>in genre <b>{filter}</b></p>
        </>
      }
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
      </table>
      <div>
        {genres.map(g =>
          <button key={g} onClick={() => setFilter(g)}>{g}</button>
        )}
      </div>
    </div>
  )
}

export default Books