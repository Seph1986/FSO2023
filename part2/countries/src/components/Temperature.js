import React, {useState, useEffect} from "react";
import axios from "axios";

const Temperature = ({capital}) => {
  const [weather, setWeather] = useState({})

  const myKey = process.env.REACT_APP_API_KEY


  // FETCHING WEATHER DATA
  const hook = () => {

    axios.get(
      `http://api.weatherstack.com/current?access_key=${myKey}&query=${capital}`
      ).then(res => {
        let current = res.data.current
        setWeather(current)
      })
  }

  useEffect(hook, [capital])

  
  return(
    <div>
      <h4>Weather in {capital}</h4>
      <div><strong>temperature: </strong>{weather.temperature} °C</div>
      <img src={weather.weather_icons}
        alt="weather" />
      <div><strong>wind: </strong>{weather.wind_speed} km/h, direction {weather.wind_dir}</div>
    </div>
  )

}

export default Temperature