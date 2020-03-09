import React, { useState } from 'react'
import Numbers from './components/Numbers'

const Title = ({ title }) => <h2>{title}</h2>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'}
    ,{ name: 'Nick', number:'04040404040' }
  ])
  const [newName, setNewName] = useState('Name')
  const [newNumber, setNewNumber] = useState('Number')

  console.log({ persons });
  console.log({ newName });
  console.log({newNumber});
  

  const addPerson = (event) => {
    event.preventDefault()
    console.log('click', event.target)

    const personObj = {
      name: newName,
      number: newNumber
    }
    console.log({ personObj });

    if (!persons.every((person) => person.name !== newName)) 
    {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Title title={'Phonebook'} />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <Numbers persons={persons} />
    </div>
  )
}

export default App