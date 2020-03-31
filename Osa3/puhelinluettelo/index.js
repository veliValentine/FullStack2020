const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

//GET /
app.get('/', (request, response) => {
    response.send('<h1>Tervetuloa</h1>')
})

//GET /info
app.get("/info", (request, response) => {
    const people = persons.length
    const date = new Date()
    const s = `<p>Phonebook has info for ${people} people</p><p>${date}</p>`
    console.log(`/info`)
    console.log(`   people: ${people}`)
    console.log(`   date: ${date}`)

    response.send(s)
})

//GET PERSONS
app.get('/api/persons', (request, response) => {
    console.log(`GET PERSONS`)
    
    response.json(persons)
})

//GET PERSON
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    console.log('GET PERSON')
    if (person) {
        console.log(`   Henkilö löytyi id:${person.id}`)
        response.json(person)
    } else {
        console.log(`   Henkilöä ei löydy id:${id}`)
        response.status(404).end()
    }
})

//DELETE PERSON
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log('DELETE PERSON')
    console.log(`   id: ${id}`)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})