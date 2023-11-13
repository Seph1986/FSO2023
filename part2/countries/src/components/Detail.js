import React from "react";

const Detail = ({country}) =>{
	let myCountry = country
  let languages = Object.values(myCountry.languages)

	if (country.langth === 0) console.log('empty...')

    return(
      <div>
        <h3>{myCountry.name.common}</h3>
        <div><strong>capital:</strong> {myCountry.capital}</div>
        <div><strong>population:</strong> {myCountry.population}</div>
        <h4>lenguages</h4>
        <ul>
          {languages.map(lan =>(
            <li key={lan}>{lan}</li>
          ))}
        </ul>
        <img src={myCountry.flags.svg} 
        alt='flag' 
        style={{ width: '150px' }}
        />
      </div>
    )
}

export default Detail