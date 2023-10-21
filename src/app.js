// Ergast F1 Database NodeJS API
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

const sequelize = require('./api/database/database')
const circuitsRoute = require('./api/routes/circuits')
const constructorsRoute = require('./api/routes/constructors')
const driversRoute = require('./api/routes/drivers')

const app = express()

const url = '/api/ergast/f1'
app.use(`${url}/circuits`, circuitsRoute)
app.use(`${url}/constructors`, constructorsRoute)
app.use(`${url}/drivers`, driversRoute)

// middlewares
app.use(express.json())


sequelize.sync()
  .then(() => {
    const port = process.env.PORT || 6969
    app.listen(port, () => {
      console.log(`Server listening on PORT ${port}`)
    })
  })
  .catch(err => {
    // TODO: error handling
    console.log('DB-error: ', err)
  })
