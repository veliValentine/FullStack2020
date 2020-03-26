import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import personService from './services/persons'

const Title = ({ title }) => <h2>{title}</h2>

const PersonForm = (props) => {
  console.log({ props });
  const newName = props.newName
  const newNumber = props.newNumber
  const addPerson = props.addPerson
  const handleNameChange = props.handleNameChange
  const handleNumberChange = props.handleNumberChange

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with<input onChange={handleFilter} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  console.log({ persons });
  console.log({ newName });
  console.log({ newNumber });

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault()
    console.log('click', event.target)

    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    console.log({ personObj });

    if (!persons.every((person) => person.name !== newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log({ filter });
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

      <Filter filter={filter} setFilter={setFilter} handleFilter={handleFilter} />

      <Title title={'add a new'} />

      <PersonForm newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />

      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App