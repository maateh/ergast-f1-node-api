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

// associations
const { createSeasonAssociations } = require('./converters/season')

const startConversion = () => {
  return circuitConverter() // DONE
    .then(() => driverConverter())
    .then(() => constructorConverter())
    .then(() => weekendConverter())
    .then(() => seasonConverter()) // DONE
    .then(() => raceResultConverter()) // DONE
    .then(() => qualifyingResultConverter()) // DONE
    .catch(err => {
      console.error('An error occurred during conversion: ', err)
    })
}

const createAssociations = () => {
  return createSeasonAssociations()
    .then(() => {

    })
    .catch(err => {
      console.error('An error occurred during creating associations: ', err)
    })
}

const convertMySQLToMongo = () => {
  return createConnection()
    .then(() => startConversion())
    .then(() => createAssociations())
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
