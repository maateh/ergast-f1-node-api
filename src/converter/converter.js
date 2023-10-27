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
const sprintResultConverter = require('./converters/sprintResult')

// associations
const { createWeekendAssociations } = require('./converters/weekend')

const startConversion = async () => {
  try {
    await circuitConverter()
    await seasonConverter()
    await driverConverter()
    await teamConverter()
    await weekendConverter()
    await raceResultConverter()
    await qualifyingResultConverter()
    await sprintResultConverter()
  } catch (err) {
    console.error('An error occurred during conversion: ', err)
  }
}

const createAssociations = async () => {
  try {
    await createWeekendAssociations()
  } catch (err) {
    console.error('An error occurred during creating associations: ', err)
  }
}

const convertMySQLToMongo = async () => {
  await createConnection()
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
