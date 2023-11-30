// F1 API (created with Node & Express) based on the Ergast F1 Database dumps
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

// services
const connectToMongoDb = require('./api/services/databaseConnection')

// middlewares
const requestLogger = require('./api/middlewares/requestLogger')
const responseMetadata = require('./api/middlewares/responseMetadata')
const handleUnmatchedRoutes = require('./api/middlewares/handleUnmatchedRoutes')
const handleErrors = require('./api/middlewares/handleErrors')

// routes
const seasonsRoutes = require('./api/routes/seasonsRoutes')
const weekendsRoutes = require('./api/routes/weekendsRoutes')
const circuitsRoutes = require('./api/routes/circuitsRoutes')
const driversRoutes = require('./api/routes/driversRoutes')
const teamsRoutes = require('./api/routes/teamsRoutes')
const resultsRoutes = require('./api/routes/resultsRoutes')
const standingsRoutes = require('./api/routes/standingsRoutes')
const timingsRoutes = require('./api/routes/timingsRoutes')
const pitstopsRoutes = require('./api/routes/pitstopsRoutes')

const BASE_URL = process.env.BASE_URL

const app = express()

app.use(express.json())
app.use(requestLogger)
app.use(responseMetadata)

app.use(`${BASE_URL}/seasons`, seasonsRoutes)
app.use(`${BASE_URL}/weekends`, weekendsRoutes)
app.use(`${BASE_URL}/circuits`, circuitsRoutes)
app.use(`${BASE_URL}/drivers`, driversRoutes)
app.use(`${BASE_URL}/teams`, teamsRoutes)
app.use(`${BASE_URL}/results`, resultsRoutes)
app.use(`${BASE_URL}/standings`, standingsRoutes)
app.use(`${BASE_URL}/timings`, timingsRoutes)
app.use(`${BASE_URL}/pitstops`, pitstopsRoutes)

app.use(handleUnmatchedRoutes)
app.use(handleErrors)

// Initialize app
connectToMongoDb()
  .then(() => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.info(`API listening on port ${port}`)
    })
  })
  .catch(err => {
    console.error('Error on application start: ', err)
  })
