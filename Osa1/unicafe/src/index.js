import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Title = ({ title }) => <h1>{title}</h1>

const Display = ({ count, name }) => {
    if (name === 'positive') {
        return (
            <p>{name} {count*100}%</p>
        )
    }
    return (
        <p>{name} {count}</p>)
}

const Statistics = (props) => {

}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [sum, setSum] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
        setAll(all + 1)
        setSum(sum + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
        setSum(sum + 0)
    }
    const handleBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
        setSum(sum - 1)
    }

    return (
        <div>
            <Title title={'give feedback'} />
            <Button onClick={handleGood} text='good' />
            <Button onClick={handleNeutral} text='neutral' />
            <Button onClick={handleBad} text='bad' />

            <Title title={'statistics'} />
            <Display count={good} name='good' />
            <Display count={neutral} name='neutral' />
            <Display count={bad} name='bad' />
            <Display count={all} name='all' />
            <Display count={sum / all} name='average' />
            <Display count={good / all} name='positive' />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)