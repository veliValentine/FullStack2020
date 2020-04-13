import React, { useState, useEffect } from 'react'
import countryService from './services/maidentiedot'
import Display from './components/Display'

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
            <Display countries={filterCountries()} />
        </div>
    )
}

export default App