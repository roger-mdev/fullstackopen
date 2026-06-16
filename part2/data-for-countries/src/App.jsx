import { useState, useEffect } from "react"
import axios from 'axios'
import Search from "./components/Search"
import Display from "./components/Display"

const App = () => {
  const [countries, setCountries] = useState(null)
  const [query, setQuery] = useState('')
  
  const filteredCountries = countries !== null ? 
    countries.filter(country =>
      country.searchString.includes(query.toLowerCase())) : null
  
  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {setCountries(response.data.map(country => {
        const searchable = [ 
          country.name.common, 
          country.name.official,
          country.cca2,
          country.cca3,
          country.cioc]

        return {
          name: country.name.common,
          searchString: searchable.join(" ").toLowerCase(),
          data: country
        }
    }))
      console.log('response from /api/all', response)
    })      
      .catch(error => {
        console.log(error)
        console.log(countries)
      })
  } , [])

  const onQueryChange = (e) => setQuery(e.target.value)

  return (
    <div>
      <Search search={query} onChange={onQueryChange}/>
      <Display list={filteredCountries} setQuery={setQuery}/> 
    </div>
  )
}

export default App