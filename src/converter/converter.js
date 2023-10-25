require('dotenv').config()

const { createConnection } = require('../api/database/database')

// converters
const circuitConverter = require('./converters/circuit')
const seasonConverter = require('./converters/season')
const weekendConverter = require('./converters/weekend')
const driverConverter = require('./converters/driver')
const constructorConverter = require('./converters/constructor')

const startConversion = async () => {
  try {
    await circuitConverter()
    await driverConverter()
    await constructorConverter()
    await weekendConverter()
    await seasonConverter()
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
    console.info('Conversion success!')
    process.exit()
  })
  .catch(err => {
    console.error('Error: ', err)
  })
