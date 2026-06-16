import { useEffect, useState } from "react"
import axios from "axios"

const CountryInfo = ({ selected }) => {
  const [weather, setWeather] = useState(null)
 
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const ENABLE_WEATHER = true;
  const ENABLE_MOCK = false;

  const CAPITAL = Array.isArray(selected.capital) ? selected.capital[0] : selected.capital
  
  const MOCK_WEATHER = {
    main: {
      temp: 17.69
    },
    weather: {
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d'
    },
    wind: {
      speed: 2.61,
      deg: 4,
      gust: 3.33
    }
  }
  
  useEffect(() => {
    
    const fetchWeather = async () => {
      const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${CAPITAL}&limit=1&appid=${API_KEY}`)
      console.log(`geoResponse `, geoResponse)
      const { lat, lon } = geoResponse.data[0]

      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      console.log(`weatherResponse`, weatherResponse)
      setWeather(weatherResponse.data)
    }

    console.log(`Mock weather state`, ENABLE_MOCK)
    if (!ENABLE_WEATHER) return;
    if (ENABLE_MOCK) {
      setWeather(MOCK_WEATHER)
    } else {
      fetchWeather()
    }
  } , [])

  return (
  <div>
    <h1>{selected.name.common}</h1>
    <p>Capital: {CAPITAL}</p>
    <p>Area: {selected.area}</p>
    <h2>Languages</h2>
    <ul>
      {Object.values(selected.languages).map(language =>
        <li key={language}>{language}</li>
      )}
    </ul>
    <img src={selected.flags.svg} alt={selected.flags.alt} height={150} />
    { weather !== null ?
      <div>
      <h2>Weather in {CAPITAL}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}/>
        {console.log(`weather icon id`, weather.weather[0].icon)}
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
    :
      <div>
        <h2>Weather in {CAPITAL}</h2>
        <p>no weather data yet :(</p>
      </div>  
    }
  </div>
  )
}

export default CountryInfo