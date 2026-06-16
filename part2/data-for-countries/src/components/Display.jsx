import CountryInfo from "./CountryInfo"

const Display = ({ list, setQuery }) => {

  const listElementSyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '30px'
  }

  return (
    <>
      {list !== null ? 
        list.length <= 10 ? 
          list.length === 1 ? 
            <CountryInfo selected={list[0].data} />
          : list.map(country => <div key={country.name} style={listElementSyle} ><p>{country.name}</p> 
              <button onClick={(e) => {e.preventDefault(); setQuery(country.name)}} >show</button></div>)
        : <p>Too many matches, specify another filter</p> 
      : <p>waiting for countries to load...</p>}
    </>
  )
}

export default Display