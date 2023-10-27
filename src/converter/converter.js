require('dotenv').config()

const { performance } = require('perf_hooks')

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
    await Promise.all([
      circuitConverter(),
      seasonConverter(),
      driverConverter(),
      teamConverter()
    ]).then(() => {
      return weekendConverter()
    })

    await Promise.all([
      raceResultConverter(),
      qualifyingResultConverter(),
      sprintResultConverter()
    ])
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
  let startTime = performance.now()

  await createConnection()
    .then(() => startConversion())
    .then(() => {
      const endTime = performance.now()
      const duration = (endTime - startTime).toFixed(2)
      console.info(`Conversion finished! (${duration} ms)\n`)

      startTime = performance.now()
    })
    .then(() => createAssociations())
    .then(() => {
      const endTime = performance.now()
      const duration = (endTime - startTime).toFixed(2)
      console.info(`Associations created! (${duration} ms)`)
    })
    .catch(err => {
      console.error('Initialize failed: ', err)
    })
}

convertMySQLToMongo()
  .then(() => {
    console.info('Done!')
    process.exit()
  })
  .catch(err => {
    console.error('Error: ', err)
  })
