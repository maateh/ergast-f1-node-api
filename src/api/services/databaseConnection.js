const mongoose = require('mongoose')

const databaseConnection = () => {
  const uri = process.env.DATABASE_URI
  return mongoose.connect(uri)
    .then(() => {
      console.info('Connected successfully to MongoDB')
    })
    .catch(err => {
      console.error('Database connection failed: ', err)
      process.exit()
    })
}

module.exports = databaseConnection
