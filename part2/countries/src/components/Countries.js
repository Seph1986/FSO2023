import React from 'react';
import Detail from './Detail'

const Countries = ({ countries, modifyState }) => {
  
  const handleCLick = (country) => {
    modifyState(country.name.common.toLowerCase())
  }

  
  if (countries.length > 10) return <strong>to many countries ...</strong>
  
  if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        <ul>
          {countries.map(country => (
            <li key={country.name.common}>{country.name.common}
              <button onClick={() => handleCLick(country)}>show</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  if (countries.length === 1) return <Detail country={countries[0]} />

}

export default Countries