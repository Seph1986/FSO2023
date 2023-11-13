import React from "react";
import Temperature from "./Temperature";

const Detail = ({ country }) => {

  let capital = country.capital[0]
  let languages = Object.values(country.languages)


  return (
    <div>
      <h3>{country.name.common}</h3>
      <div><strong>capital:</strong> {country.capital}</div>
      <div><strong>population:</strong> {country.population}</div>
      <h4>lenguages</h4>
      <ul>
        {languages.map(lan => (
          <li key={lan}>{lan}</li>
        ))}
      </ul>
      <img src={country.flags.svg}
        alt='flag'
        style={{ width: '150px' }}
      />
      <Temperature capital={capital} />
    </div>
  
  )
}

export default Detail