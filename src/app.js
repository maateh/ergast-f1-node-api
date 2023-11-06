// F1 API (created with Node & Express) based on the Ergast F1 Database dumps
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

// services
const databaseConnection = require('./api/services/databaseConnection')

// middlewares
const responseMetadata = require('./api/middlewares/responseMetadata')
const handleUnmatchedRoutes = require('./api/middlewares/handleUnmatchedRoutes')
const handleErrors = require('./api/middlewares/handleErrors')

// routes
const circuitRoutes = require('./api/routes/circuitRoutes')
const driverRoutes = require('./api/routes/driverRoutes')
const teamRoutes = require('./api/routes/teamRoutes')
const weekendRoutes = require('./api/routes/weekendRoute')
const seasonRoutes = require('./api/routes/seasonRoutes')

const BASE_URL = process.env.BASE_URL

const app = express()

app.use(express.json())
app.use(responseMetadata)

app.use(`${BASE_URL}/circuits`, circuitRoutes)
app.use(`${BASE_URL}/drivers`, driverRoutes)
app.use(`${BASE_URL}/teams`, teamRoutes)
app.use(`${BASE_URL}/weekends`, weekendRoutes)
app.use(`${BASE_URL}/seasons`, seasonRoutes)

app.use(handleUnmatchedRoutes)
app.use(handleErrors)

// Initialize app
databaseConnection()
  .then(() => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.info(`API listening on port ${port}`)
    })
  })
  .catch(err => {
    console.error('Error on application start: ', err)
  })
