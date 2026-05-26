import Part from "./Part"

const Content = ({ parts }) => {
  const total = parts.reduce((acc, current) => {
    return (acc + current.exercises)
  }, 0)
  
  return (
    <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)} 
      <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
    </>
  )
}

export default Content