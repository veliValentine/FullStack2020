import React, { useState, useEffect } from 'react'
import countryService from './services/maidentiedot'

const Languages = ({ languages }) => {
    return (
        <div>
            <h3>languages</h3>
            <ul>
                {languages.map(l => (
                    <li key={l.name}>
                        {l.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Flag = ({ src }) => {
    return (
        <div>
            <img alt={'country flag'} src={src} height={70} width={100} />
        </div>
    )
}

const Info = ({ name, capital, population }) => {
    return (
        <div>
            <h2>{name}</h2>
            capital {capital}
            <br />
            population {population}
        </div>
    )
}

const Country = ({ country }) => {
    return (
        <div>
            <Info name={country.name} capital={country.capital} population={country.population} />
            <Languages languages={country.languages} />
            <Flag src={country.flag} />
        </div>
    )
}

const ListCountries = ({ countries, setCountry }) => {
    return (
        <div>
            {countries.map(c => (
                <div key={c.name}>
                    {c.name} 
                    <button onClick={() => setCountry(c.name)}>
                        show
                    </button>
                </div>
            ))}
        </div>

    )
}

const Display = ({ countries, setCountry }) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} />
            </div>
        )
    }

    if (countries.length === 0) {
        return (
            <div>
                Could not find any :( Try different filter!
            </div>
        )
    }

    return (
        <div>
            <ListCountries countries={countries} setCountry={setCountry} />
        </div>
    )
}

const FindCountry = ({ country, setCountry }) => {
    const handleCountry = (event) => {
        console.log('lookin countries ->', event.target.value)
        setCountry(event.target.value)
    }

    return (
        <form>
            find countries
            <input value={country} onChange={handleCountry} />
        </form>
    )
}

const App = () => {
    const [allCountries, setAllCountries] = useState([])
    const [country, setCountry] = useState('')

    useEffect(() => {
        countryService
            .getAll()
            .then(allCountries => {
                setAllCountries(allCountries)
            })
    }, [])

    const filterCountries = () => {
        console.log('filterin countries...')
        const someCountries = allCountries.filter(
            c => c.name.toLowerCase().includes(country.toLowerCase())
        )
        console.log('filtered countries', someCountries, someCountries.length)
        return someCountries
    }

    return (
        <div>
            <FindCountry country={country} setCountry={setCountry} />
            <Display countries={filterCountries()} setCountry={setCountry} />
        </div>
    )
}

export default App