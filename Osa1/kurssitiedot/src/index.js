import React from 'react'
import ReactDOM from 'react-dom'

const Header = (p) => {
    return (
        <h1>{p.course}</h1>
    )
}

const Total = (p) => {
    return (
        <p>Number of exercises {p.total}</p>
    )
}

const Content = (p) => {
    return (
        <div>
            <Part pa={p.p1} ex={p.e1} />
            <Part pa={p.p2} ex={p.e2} />
            <Part pa={p.p3} ex={p.e3} />
        </div>
    )
}

const Part = (p) => {
    return (
        <p>
            {p.pa} {p.ex}
        </p>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content p1={part1} p2={part2} p3={part3} e1={exercises1} e2={exercises2} e3={exercises3} />
            <Total total={exercises1 + exercises2 + exercises3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))