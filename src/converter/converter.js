require('dotenv').config()

const { createConnection } = require('../api/database/database')

// converters
const circuitConverter = require('./converters/circuit')
const seasonConverter = require('./converters/season')
const driverConverter = require('./converters/driver')
const teamConverter = require('./converters/team')
const weekendConverter = require('./converters/weekend')
const raceResultConverter = require('./converters/raceResult')
const qualifyingResultConverter = require('./converters/qualifyingResult')

// associations
const { createWeekendAssociations } = require('./converters/weekend')

const startConversion = () => {
  return circuitConverter()
    .then(() => seasonConverter())
    .then(() => driverConverter())
    .then(() => teamConverter())
    .then(() => weekendConverter())
    .then(() => raceResultConverter())
    .then(() => qualifyingResultConverter())
    .catch(err => {
      console.error('An error occurred during conversion: ', err)
    })
}

const createAssociations = () => {
  return createWeekendAssociations()
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
    console.info('Conversion done!')
    process.exit()
  })
  .catch(err => {
    console.error('Error: ', err)
  })
