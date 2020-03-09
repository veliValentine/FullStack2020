import React from 'react'

const Title = ({ title }) => <h2>{title}</h2>

const Person = (props) => {
    console.log(props);

    const { person } = props
    console.log(person);

    return (
        <p>
            {person.name}
        </p>
    )
}

const Numbers = (props) => {
    console.log('Numbers', { props });

    const persons = props.persons
    console.log({ persons });

    return (
        <div>
            <Title title={'Numbers'} />
            {persons.map(person =>
                <Person key={person.name} person={person} />
            )}
        </div>
    )
}

export default Numbers