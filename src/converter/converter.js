require('dotenv').config()

const { createConnection } = require('../api/database/database')

// converters
const circuitConverter = require('./converters/circuit')
const seasonConverter = require('./converters/season')
const weekendConverter = require('./converters/weekend')

const startConversion = async () => {
  try {
    // await circuitConverter()
    // await seasonConverter()
    await weekendConverter()
  } catch (err) {
    console.error('An error occured during conversion: ', err)
  }
}

const convertMySQLToMongo = () => {
  return createConnection()
    .then(() => startConversion())
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
