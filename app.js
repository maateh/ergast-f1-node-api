// Ergast F1 Database NodeJS API
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

const app = express()

// middlewares
app.use(express.json())

// routes
const circuitsRoute = require('./routes/circuits')
app.use('/circuits', circuitsRoute)

// server
const port = process.env.PORT || 6969
app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`)
})
