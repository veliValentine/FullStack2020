import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Title = ({ title }) => <h1>{title}</h1>

const StatisticLine = ({ text, value }) => {
    if (text === 'positive') {
        return (
            <div>
                {text} {value} %
            </div>
        )
    }
    return (
        <div>
            {text} {value}
        </div>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + bad + neutral
    const sum = good - bad

    if (all === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + bad + neutral} />
            <StatisticLine text='average' value={sum / all} />
            <StatisticLine text='positive' value={100 * good / all} />
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
            <Title title='give feedback' />
            <Button onClick={handleGood} text='good' />
            <Button onClick={handleNeutral} text='neutral' />
            <Button onClick={handleBad} text='bad' />
            <Title title='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)