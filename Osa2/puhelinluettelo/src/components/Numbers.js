import React from 'react'

const Title = ({ title }) => <h2>{title}</h2>

const Person = (props) => {
    console.log({props});

    const person = props.person
    console.log(person);

    const filter = props.filter

    const name = person.name
    console.log('Person name', {name});

    if (person.name.includes(filter)) {
        return (
            <p>
                {person.name} {person.number}
            </p>
        )
    }

    return(<></>)
}

const Numbers = (props) => {
    console.log('Numbers', { props });

    const persons = props.persons
    console.log({ persons });

    const filter = props.filter
    console.log({ filter });

    return (
        <div>
            <Title title={'Numbers'} />
            {persons.map(person =>
                <Person key={person.name} person={person} filter={filter} />
            )}
        </div>
    )
}

export default Numbers