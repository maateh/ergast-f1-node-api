// Ergast F1 Database NodeJS API
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

const circuitsRoute = require('./api/routes/circuits')
const constructorsRoute = require('./api/routes/constructors')
const driversRoute = require('./api/routes/drivers')

const BASE_URL = '/api/ergast/f1' // TODO: move to a config file

const app = express()

// Middlewares
app.use(express.json())

app.use(`${BASE_URL}/circuits`, circuitsRoute)
app.use(`${BASE_URL}/constructors`, constructorsRoute)
app.use(`${BASE_URL}/drivers`, driversRoute)

// Initialize app
const port = process.env.PORT || 6969
app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`)
})
