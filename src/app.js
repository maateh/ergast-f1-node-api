// F1 API (created with Node & Express) based on the Ergast F1 Database dumps
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

// database
const { createConnection } = require('./api/database/database')

// middlewares
const responseMetadata = require('./api/middlewares/responseMetadata')

// routes
const circuitsRoute = require('./api/routes/circuits')
const driversRoute = require('./api/routes/drivers')
const teamsRoute = require('./api/routes/teams')

const BASE_URL = process.env.BASE_URL

const app = express()

app.use(express.json())
app.use(responseMetadata)

app.use(`${BASE_URL}/circuits`, circuitsRoute)
app.use(`${BASE_URL}/drivers`, driversRoute)
app.use(`${BASE_URL}/teams`, teamsRoute)

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
