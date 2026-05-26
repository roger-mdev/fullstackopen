const Phonebook = ({search, change}) => {
  return (
    <div>
      search: <input 
      value={search}
      onChange={change}
      id='search-input'/>
    </div>
)}

export default Phonebook