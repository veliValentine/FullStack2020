import React from 'react'

const Course = (props) => {
    console.log('Course', { props });
  
    const course = props.course
    console.log({ course });
  
    const name = course.name
    console.log({ name });
  
    const id = course.id
    console.log({ id });
  
    const parts = course.parts
    console.log({ parts });
  
    return (
      <div>
        <Header name={name} />
        <Content parts={parts} />
      </div>
    )
  }

  

const Header = (props) => {
    console.log('Header', { props });
  
    const name = props.name
    console.log({ name });
  
    return (
      <h3>{name}</h3>
    )
  }
  
  const Content = (props) => {
    console.log('Content', { props });
  
    const parts = props.parts
    console.log({ parts });
  
    const totalExercises = parts.reduce((summa, part) => {
      return summa + part.exercises
    }, 0)
  
    console.log({ totalExercises });
  
  
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <TotalExercises parts={parts} />
      </div>
    )
  }
  
  const TotalExercises = (props) => {
    console.log('TotalExercises', { props });
  
    const parts = props.parts
    console.log({ parts });
  
    const totalExercises = parts.reduce((summa, part) => {
      return summa += part.exercises
    }, 0)
  
    return (
      <b>total of exercises {totalExercises} </b>
    )
  }
  
  const Part = (props) => {
    console.log('Part', { props })
  
    const part = props.part
    console.log({ part });
  
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  export default Course