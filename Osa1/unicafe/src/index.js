import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
<button onClick={onClick}>{text}</button>
)

const Title = ({ title }) => <h1>{title}</h1>

const Display = ({ count, name }) => <p>{name} {count}</p>

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

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
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)