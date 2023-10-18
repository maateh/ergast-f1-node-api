// Ergast F1 Database NodeJS API
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

const app = express()

// routes
const circuitsRoute = require('./routes/circuits')
const constructorsRoute = require('./routes/constructors')

app.use('/circuits', circuitsRoute)
app.use('/constructors', constructorsRoute)

// middlewares
app.use(express.json())

// server
const port = process.env.PORT || 6969
app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`)
})
