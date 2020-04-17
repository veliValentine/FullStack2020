import React from 'react'

const Person = ({ person, filter, deletePerson }) => {
    const name = person.name
  
    if (name.toLowerCase().match(filter.toLowerCase())) {
      return (
        <div>
          {name} {person.number} <button onClick={deletePerson}>delete</button>
        </div>
      )
    }
    return (<></>)
  }

  export default Person