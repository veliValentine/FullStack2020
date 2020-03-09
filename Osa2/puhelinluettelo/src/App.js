import React, { useState } from 'react'
import Numbers from './components/Numbers'

const Title = ({title}) => <h2>{title}</h2>

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

console.log({persons});
console.log({newName});

  const addPerson = (event) => {
    event.preventDefault()
    console.log('click', event.target)

    const personObj ={
      name: newName
    }

    setPersons(persons.concat(personObj))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <Title title={'Phonebook'} />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <Numbers persons={persons}/>
    </div>
  )
}

export default App