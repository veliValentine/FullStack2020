import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'

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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons');
  
  const addPerson = (event) => {
    event.preventDefault()
    console.log('click', event.target)

    const personObj = {
      name: newName,
      number: newNumber
    }
    console.log({ personObj });

    if (!persons.every((person) => person.name !== newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
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