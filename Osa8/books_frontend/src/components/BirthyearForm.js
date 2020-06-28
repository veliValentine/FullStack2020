import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR } from '../queries'


const BirthyearForm = () => {
  const [name, setName] = useState('')
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
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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