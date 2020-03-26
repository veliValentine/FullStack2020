import React from 'react'

const Title = ({ title }) => <h2>{title}</h2>

const Person = ({person, filter}) => {
    const name = person.name

    if (name.toLowerCase().match(filter.toLowerCase())) {
        return (
            <p>
                {name} {person.number}
            </p>
        )
    }

    return(<></>)
}

const Numbers = ({persons, filter}) => {
    return (
        <div>
            <Title title={'Numbers'} />
            {persons.map(person =>
                <Person key={person.id} person={person} filter={filter} />
            )}
        </div>
    )
}

export default Numbers