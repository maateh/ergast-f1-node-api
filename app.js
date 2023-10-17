// Ergast F1 Database NodeJS API
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

// middlewares
app.use(bodyParser.json())

// routes
// const exampleRoute = require('./routes/exampleRoute')
// app.use('/exampleRoute', exampleRoute)

const app = express()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`)
})
