require('dotenv').config()

const { createConnection } = require('../api/database/database')
const { getAllCircuits } = require('./queries')

const convertMySQLToMongo = async () => {
  return createConnection()
    .then(() => getAllCircuits())
    .then(circuits => {
      console.log('circuits: ', circuits)
    })
    .catch(err => {
      console.error('Initialize failed: ', err)
    })
}

convertMySQLToMongo()
  .then(() => {
    console.log('Success!')
    process.exit()
  })
  .catch(err => {
    console.error('Error: ', err)
  })
