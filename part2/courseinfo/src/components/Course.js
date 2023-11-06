import React from 'react'

const Header = ({header}) => <h2>{header}</h2>


const Part = ({part}) =>{
  return(
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}


const Content = ({parts}) =>{
  return(
    <div>
      {parts.map(part =>(
        <Part key={part.id} part={part}/>
      ))}
    </div>
  )
}


const Total = ({parts}) => {
  
  const totalExercises = parts.reduce((total, part)=>{
    return total + part.exercises
  },0)

  return(
    <div>
      <strong>Total of {totalExercises} exercises</strong>
    </div>
  )
}


const Course = ({course}) => {
  return(
    <div>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
} 

export default Course