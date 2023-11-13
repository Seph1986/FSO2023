import React, { useState, useEffect } from "react";
import axios from 'axios'
import Countries from "./components/Countries";

const App = () => {

  const [allCountries, setAllCountries] = useState([])
  const [input, setInput] = useState('')


  // GETING ALL THE COUNTRIES
  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        let countries = response.data
        setAllCountries(countries)
      })
  }

  useEffect(hook, [])


  // INPUT CONTROL
  const handleCountrieChange = (event) => {
    console.log(event.target.value)
    setInput(event.target.value.toLowerCase())
  }


  // FILTER COUNTRIES
  const filter = allCountries.filter(
    element => element.name.common.toLowerCase().includes(input)
  )

  return (
    <div>
      <label>find countries:</label>
      <input type="text" value={input} onChange={handleCountrieChange} />
      <div>
        <Countries countries={filter} modifyState={setInput}/>
      </div>
    </div>
  )
}

export default App