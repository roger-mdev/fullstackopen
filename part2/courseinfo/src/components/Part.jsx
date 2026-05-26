const Part = ({ name, exercises }) => {
  console.log("part component props", name, exercises)
  return (
    <p>{name} {exercises}</p>
  ) 
}

export default Part