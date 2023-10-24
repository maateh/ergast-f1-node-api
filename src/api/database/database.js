const mongoose = require('mongoose')

const createConnection = async () => {
  const uri = process.env.DATABASE_URI
  return mongoose.connect(uri)
    .then(() => {
      console.log('Connected successfully to MongoDB')
    })
    .catch(err => {
      console.error('Database connection failed: ', err)
    })
}

module.exports = { createConnection }
