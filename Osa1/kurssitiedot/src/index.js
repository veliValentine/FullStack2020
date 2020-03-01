import React from 'react'
import ReactDOM from 'react-dom'

const Header = (p) => {
    console.log('Header ', p)
    return (
        <h1>{p.course}</h1>
    )
}

const Total = (p) => {
    console.log('Total exercise ', p)
    return (
        <p>Number of exercises {p.total}</p>
    )
}

const Content = (p) => {
    console.log('Content ', p)
    return (
        <div>
            <Part pa={p.p1.name} ex={p.p1.exe} />
            <Part pa={p.p2.name} ex={p.p2.exe} />
            <Part pa={p.p3.name} ex={p.p3.exe} />
        </div>
    )
}

const Part = (p) => {
    console.log('Part ', p)
    return (
        <p>
            {p.pa} {p.ex}
        </p>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exe: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exe: 7
    }
    const part3 = {
        name: 'State of a component',
        exe: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content p1={part1} p2={part2} p3={part3}/>
            <Total total={part1.exe + part2.exe + part3.exe} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))