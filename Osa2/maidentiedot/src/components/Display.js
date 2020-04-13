import React from 'react'
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

export default Display