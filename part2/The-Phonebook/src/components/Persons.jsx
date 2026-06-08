const Persons = ({persons, onClick}) => {
  return (
    persons.map(person => 
    <li key={person.id}>
      {person.name}: {person.number}
      <button onClick={() => onClick(person.id)}>delete</button>
    </li>)
  )
}

export default Persons