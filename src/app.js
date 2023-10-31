// F1 API (created with Node & Express) based on the Ergast F1 Database dumps
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

// database
const { createConnection } = require('./api/database/database')

// middlewares
const responseMetadata = require('./api/middlewares/responseMetadata')
const unmatchedRoutesHandler = require('./api/middlewares/unmatchedRoutesHandler')
const errorHandler = require('./api/middlewares/errorHandler')

// routes
const circuitRoutes = require('./api/routes/circuitRoutes')
const driverRoutes = require('./api/routes/driverRoutes')
const teamRoutes = require('./api/routes/teamRoutes')

const BASE_URL = process.env.BASE_URL

const app = express()

app.use(express.json())
app.use(responseMetadata)

app.use(`${BASE_URL}/circuits`, circuitRoutes)
app.use(`${BASE_URL}/drivers`, driverRoutes)
app.use(`${BASE_URL}/teams`, teamRoutes)

app.use(unmatchedRoutesHandler)
app.use(errorHandler)

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
