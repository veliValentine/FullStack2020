import React, { useState } from 'react'
import Numbers from './components/Numbers'

const Title = ({ title }) => <h2>{title}</h2>

const PersonForm = (props) => {
  console.log({props});
  const newName = props.newName
  const newNumber = props.newNumber
  const setNewName = props.setNewName
  const setNewNumber = props.setNewNumber
  const addPerson = props.addPerson
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] =useState('')

  console.log({ persons });
  console.log({ newName });
  console.log({ newNumber });


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
    console.log({filter});
  }

  return (
    <div>
      <Title title={'Phonebook'} />
      
      filter shown with<input onChange={handleFilter}/>

      <Title title={'add a new'} />

      <PersonForm newName={newName} 
      newNumber={newNumber} 
      setNewName={setNewName} 
      setNewNumber={setNewNumber}
      addPerson={addPerson}/>
      

      <Numbers persons={persons} filter={filter}/>
    </div>
  )
}

export default App