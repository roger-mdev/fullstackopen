const PersonForm = ({name, number, nameChange, numberChange, addPerson}) => {
return (
  <form onSubmit={addPerson} >
    <div>
      name: <input 
        value={name}
        onChange={nameChange}
        id='name-input'/>
    </div>
    <div>
      number: <input 
        value={number}
        onChange={numberChange}
        id='number-input'/>
    </div>
    <div><button type="submit">add</button></div>
  </form>
)}

export default PersonForm