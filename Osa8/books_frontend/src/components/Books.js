import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [filter, setFilter] = useState('all genres')
  const [genres, setGenres] = useState(['all genres'])//sisältää kaikkien kirjojen genret kyselyn kirjoista riippumatta

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter === 'all genres' ? '' : filter }
  })//8.21 rajoitetaan suoraan 8.5 genren avulla

  useEffect(() => {
    result.refetch()
  }, [filter]) // eslint-disable-line

  useEffect(() => {//hakee genret
    if (result.data) {
      let g = genres
      result.data.allBooks.forEach(b => g = g.concat(b.genres))
      g = [...new Set(g)]
      setGenres(g)
    }
  }, [result.data, filter]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>)
  }
  //console.log(result.data)
  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      {filter === 'all genres' ?
        null :
        <p>in genre <b>{filter}</b></p>
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