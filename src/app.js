// Ergast F1 Database NodeJS API
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

const {
  createDummyCircuit,
  createDummySeason,
  createDummyWeekend
} = require('./api/utils/dummy')

const { createConnection } = require('./api/database/database')

const circuitsRoute = require('./api/routes/circuits')
const constructorsRoute = require('./api/routes/constructors')
const driversRoute = require('./api/routes/drivers')

const BASE_URL = process.env.BASE_URL

const app = express()

// Middlewares
app.use(express.json())

app.use(`${BASE_URL}/circuits`, circuitsRoute)
app.use(`${BASE_URL}/constructors`, constructorsRoute)
app.use(`${BASE_URL}/drivers`, driversRoute)

// Initialize app
createConnection()
  .then(() => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`API listening on port ${port}`)
    })
  })
  .catch(err => {
    console.error('Error on application start: ', err)
  })
