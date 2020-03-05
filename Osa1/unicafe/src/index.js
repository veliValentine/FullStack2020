import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Title = ({ title }) => <h1>{title}</h1>

const Display = ({ count, name }) => {
    return (
        <p>{name} {count}</p>)
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + bad + neutral
    const sum = good - bad
    const average = sum / all
    const positive = 100* good / all

    if (all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h1>statistics</h1>
            <p>good {good}<br/>
            neutral {neutral}<br/>
            bad {bad}<br/>
            all {all}<br/>
            average {average}<br/>
            positive {positive} %</p>
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Title title={'give feedback'} />
            <Button onClick={handleGood} text='good' />
            <Button onClick={handleNeutral} text='neutral' />
            <Button onClick={handleBad} text='bad' />

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)