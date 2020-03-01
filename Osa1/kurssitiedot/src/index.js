import React from 'react'
import ReactDOM from 'react-dom'

const Header = (p) => {
    console.log('Header ', p)
    return (
        <h1>{p.course}</h1>
    )
}

const Total = (p) => {
    console.log('Total exercise ', p.oliot)
    let summa = 0
    
    p.oliot.forEach(v => {
        summa += v.exercises
    })
    return (
        <p>Number of exercises {summa}</p>
    )
}

const Content = (p) => {
    console.log('Content ', p.oliot)
    return (
        <div>
            <Part olio={p.oliot[0]}/>
            <Part olio={p.oliot[1]}/>
            <Part olio={p.oliot[2]}/>
        </div>
    )
}

const Part = (p) => {
    console.log('Part ', p.olio)
    return (
        <p>
            {p.olio.name} {p.olio.exercises}
        </p>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course} />
            <Content oliot={parts} />
            <Total oliot={parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))