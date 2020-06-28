import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR } from '../queries'

const BirthyearForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [changeBirth] = useMutation(UPDATE_AUTHOR)

  const updateAuthor = (event) => {
    event.preventDefault()

    changeBirth({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={updateAuthor}>
        <div>
          <select
          value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map(a => {
              return (
                <option key={a.id}>{a.name}</option>
              )
            })}
          </select>
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm