import React, { useState, useEffect } from 'react'
import countryService from './services/maidentiedot'
import weatherService from './services/weatherService'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState('')

    useEffect(() => {
        weatherService
            .getByName(country.capital).then(we => setWeather(we))
    }, [country.capital])

    if (weather == null) {
        console.log('NULL WEATHER')
        return (
            <></>
        )
    }
    if (weather === undefined) {
        console.log('undefined WEATHER')
        return (
            <></>
        )
    }
    if (weather.location === undefined || weather.current === undefined) {
        console.log('undefined WEATHER')
        return (
            <></>
        )
    }
    console.log('found weather information')
    const name = weather.location.name
    const t = weather.current.temperature
    const imgSRC = weather.current.weather_icons[0]
    const windSpeed = weather.current.wind_speed
    const windDir = weather.current.wind_dir

    return (
        <div>
            <div><h3>Weather in {name}</h3></div>
            <div><b>temperature:</b> {t} Celsius</div>
            <div><img alt={'weather symbol'} src={imgSRC} length={30} width={30} /> </div>
            <div><b>wind:</b> {windSpeed} mph direction {windDir}</div>
        </div>
    )
}

const Countries = ({ countries, setFilter }) => {
    return (
        <div>
            {countries.map(c => (
                <div key={c.name}>
                    {c.name}
                    <button onClick={() => setFilter(c.name)}>show</button>
                </div>
            ))}
        </div>
    )
}

const Languages = ({ languages }) => {
    return (
        <div>
            <h3>
                Spoken languages
            </h3>

            <ul>
                {languages.map(l => (
                    <li key={l.name}>
                        {l.name}
                    </li>
                ))}
            </ul>
        </div >
    )
}

const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                capital {country.capital}
                <br />
                population {country.population}
            </div>
            <Languages languages={country.languages} />
            <div>
                <img alt={'country flag'} src={country.flag} height={70} width={100} />
            </div>
            <Weather country={country} />
        </div >
    )
}

const ShowCountries = ({ filter, allCountries, setFilter }) => {
    console.log('Filtering countries...', filter)
    const countries = allCountries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (countries.length === 0) {
        return (
            <div>
                No matches, specify another filter
            </div>
        )
    }
    if (countries.length === 1) {
        const c = countries[0]
        return (
            <div>
                <Country country={c} />
            </div>
        )
    }
    return (
        <div>
            <Countries countries={countries} setFilter={setFilter} />
        </div>
    )
}

const App = () => {
    const [allCountries, setAllCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        countryService
            .getAll()
            .then(countries => {
                setAllCountries(countries)
            })
    }, [])

    const handleChange = (event) => {
        setFilter(event.target.value)
        console.log(event.target.value, filter)
    }
    return (
        <div>
            <form>
                find countries
            <input value={filter} onChange={handleChange} />
            </form>

            <ShowCountries allCountries={allCountries} filter={filter} setFilter={setFilter} />
        </div>
    )
}

export default App