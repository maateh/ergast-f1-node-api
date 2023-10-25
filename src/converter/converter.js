require('dotenv').config()

const { createConnection } = require('../api/database/database')

// converters
const circuitConverter = require('./converters/circuit')
const seasonConverter = require('./converters/season')
const weekendConverter = require('./converters/weekend')
const driverConverter = require('./converters/driver')
const constructorConverter = require('./converters/constructor')
const raceResultConverter = require('./converters/raceResult')
const qualifyingResultConverter = require('./converters/qualifyingResult')

const startConversion = async () => {
  try {
    await circuitConverter() // DONE
    await driverConverter()
    await constructorConverter()
    await weekendConverter()
    await seasonConverter()
    await raceResultConverter() // DONE
    await qualifyingResultConverter() // DONE
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
