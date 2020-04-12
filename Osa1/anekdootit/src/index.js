import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <Text text={anecdote} />
      <Votes votes={votes} />
    </div>
  )
}

const Votes = ({ votes }) => {
  return (
    <div>
      has {votes} votes
    </div>
  )
}

const Text = ({ text }) => {
  return (
    <div>
      {text}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
  const [mostVotes, setMostVotes] = useState(selected)

  const handleNextClick = () => {
    let randomNumber = getRandomInt(anecdotes.length)
    if (randomNumber === selected) {
      randomNumber -= 1
      if (randomNumber < 0) {
        randomNumber += 2
      }
    }
    console.log(`CLICK! Random number:${randomNumber}`)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    console.log(`voted:${selected}`)
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)

    if (votes[selected] >= votes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <Title text={'Anecdote of the day'} />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVote} text={'vote'} />
      <Button onClick={handleNextClick} text={'next anecode'} />
      <Title text={'Anecdote with most votes'} />
      <Anecdote anecdote={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)