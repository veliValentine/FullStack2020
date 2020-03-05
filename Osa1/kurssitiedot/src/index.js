import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    console.log('Header ', props.course)
    return (
        <h1>{props.course.name}</h1>
    )
}
 
const Total = (props) => {
    console.log('Total exercise ', props.course)
    let summa = 0

    props.course.parts.forEach(part => {
        summa += part.exercises
    })
    return (
        <p>Number of exercises {summa}</p>
    )
}

const Content = (props) => {
    console.log('Content ', props.course)
    return (
        <div>
            <Part part={props.course.parts[0]} />
            <Part part={props.course.parts[1]} />
            <Part part={props.course.parts[2]} />
        </div>
    )
}

const Part = (props) => {
    console.log('Part ', props.part)
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
    }
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))