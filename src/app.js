// Ergast F1 Database NodeJS API
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const { createCircuit } = require('./api/utils/dummy')

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
const uri = process.env.DATABASE_URI
mongoose.connect(uri)
  .then(() => {
    console.log('Connected successfully to MongoDB')
    // createCircuit()

    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  })
  .catch(err => {
    console.error('Database connection failed: ', err)
  })
