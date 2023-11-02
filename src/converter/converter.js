require('dotenv').config()

const { performance } = require('perf_hooks')

const { createConnection } = require('../api/database/database')

// converters
const circuitConverter = require('./converters/circuitConverter')
const seasonConverter = require('./converters/seasonConverter')
const driverConverter = require('./converters/driverConverter')
const teamConverter = require('./converters/teamConverter')
const weekendConverter = require('./converters/weekendConverter')
const raceResultConverter = require('./converters/raceResultConverter')
const qualifyingResultConverter = require('./converters/qualifyingResultConverter')
const sprintResultConverter = require('./converters/sprintResultConverter')
const pitStopConverter = require('./converters/pitStopConverter')
const lapTimeConverter = require('./converters/lapTimeConverter')

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
      sprintResultConverter(),
      pitStopConverter(),
      lapTimeConverter()
    ])
  } catch (err) {
    console.error('An error occurred during conversion: ', err)
  }
}

const convertMySQLToMongo = async () => {
  const startTime = performance.now()

  await createConnection()
    .then(() => startConversion())
    .then(() => {
      const endTime = performance.now()
      const duration = (endTime - startTime).toFixed(2)
      console.info(`Conversion finished! (${duration} ms)\n`)
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
