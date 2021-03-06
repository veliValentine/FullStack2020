import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Title from './components/Title'
import Notification from './components/Notification'

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
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  console.log({ persons });
  console.log({ newName });
  console.log({ newNumber });

  const clearError = () => {
    setError(true)
    setTimeout(() => {
      setNotification(null)
      setError(false)
    }, 10000)
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setNotification('Database not found')
        clearError()
      })
  }, [])

  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault()
    console.log('click', event.target)

    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length > 0 ? persons[persons.length - 1].id + 1 : persons.length + 1
    }

    console.log({ personObj });

    const nameIsNotInDb = persons.every((person) => person.name !== newName)

    if (!nameIsNotInDb) {
      if (window.confirm(`${personObj.name} is already added to phonebook, replace the old number with a new one?`)) {
        //Update information on Person
        const id = persons.find(person => person.name === personObj.name).id

        personService
          .updatePerson(id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification(`Number updated for ${personObj.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setNotification(
              error.response.data.error
              //`Information of ${personObj.name} has already been removed from server`
            )
            clearError()
            //setPersons(persons.filter(p => p.id !== id))
          })
      }

    } else {
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${personObj.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setNotification(error.response.data.error)
          //setNotification(`Failed to create person ${personObj.name}`)
          setError(true)
          setTimeout(() => {
            setNotification(null)
            setError(false)
          }, 10000)
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))

          setNotification(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setNotification(error.response.data.error)
          //setNotification(`Information of ${person.name} has already been removed from server`)
          clearError()
          setPersons(persons.filter(p => p.id !== person.id))
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
      <a href='./api/persons'>data</a>
      <Title title={'Phonebook'} />

      <Notification message={notification} error={error} />

      <Filter filter={filter} setFilter={setFilter} handleFilter={handleFilter} />

      <Title title={'add a new'} />

      <PersonForm newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />

      <Title title={'Numbers'} />

      {persons.map(person =>
        <Person
          key={person.id}
          person={person}
          filter={filter}
          deletePerson={() => deletePerson(person)}
        />

      )}
    </div>
  )
}

export default App