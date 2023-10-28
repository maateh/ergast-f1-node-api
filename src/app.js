// F1 API (created with Node & Express) based on the Ergast F1 Database dumps
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

// database
const { createConnection } = require('./api/database/database')

// models
const circuitsRoute = require('./api/routes/circuits')
const teamsRoute = require('./api/routes/teams')
const driversRoute = require('./api/routes/drivers')

// utils
const queryParams = require('./api/utils/queryParams')

const BASE_URL = process.env.BASE_URL

const app = express()

// Middlewares
app.use(express.json())
app.use(queryParams)

app.use(`${BASE_URL}/circuits`, circuitsRoute)
app.use(`${BASE_URL}/teams`, teamsRoute)
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
