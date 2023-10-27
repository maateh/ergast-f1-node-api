const db = require('../database/mysql')

// models
const Driver = require('../../api/models/driver')
const Season = require('../../api/models/season')
const RaceResult = require('../../api/models/raceResult')

const getAllDrivers = () => {
  const query = 'SELECT * FROM drivers'

  console.info('Get drivers from the MySQL Database...')
  return db.execute(query)
    .then(([drivers]) => drivers)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Drivers conversion started...')
  return getAllDrivers()
    .then(drivers => {
      return drivers.map(driver => {
        return new Driver({
          ergastId: driver.driverId,
          ref: driver.driverRef,
          number: driver.number || undefined,
          code: driver.code || undefined,
          name: {
            firstName: driver.forename,
            lastName: driver.surname
          },
          dateOfBirth: driver.dob,
          nationality: driver.nationality,
          wiki: driver.url,
          // _circuits: ,
        })
      })
    })
    .then(convertedDrivers => {
      console.info('Inserting drivers...')
      return Driver.insertMany(convertedDrivers)
    })
    .then(() => {
      console.info('Drivers conversion done!\n')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

const createAssociations = () => {
  console.info('Creating associations to the Driver model...')

  return Promise.all([
    Driver.find(),
    Season.find().populate('_weekends'),
    RaceResult.find().populate('_weekend'),
  ])
    .then(([drivers, seasons, results]) => {
      return drivers.map(driver => {
        // const driverSeasons = seasons.filter(s => s._drivers.includes(driver._id))
        const driverResults = results.filter(r => r._driver.equals(driver._id))

        // const parsedSeasons = driverSeasons.map(s => {
        //   const driverWeekends = s._weekends.filter(w => w._drivers.includes(driver._id))
        //   return {
        //     year: s.year,
        //     _season: s._id,
        //     weekends: driverWeekends.map(w => {
        //       return {
        //         round: w.round,
        //         _weekend: w._id,
        //         _constructor: driverResults.find(r => {
        //           return r._weekend._id.equals(w._id) && r._driver.equals(driver._id)
        //         })._constructor
        //       }
        //     })
        //   }
        // })

        const circuits = new Set(driverResults.map(r => r._weekend._circuit.toString()))

        // driver.seasons = parsedSeasons
        driver._circuits = Array.from(circuits)
        return driver
      })
    })
    .then(updatedDrivers => {
      console.info('Saving drivers...')
      return Driver.bulkSave(updatedDrivers)
    })
    .then(() => {
      console.info('Associations is created successfully for the Driver model!\n')
    })
    .catch(err => {
      console.error('Association creation error: ', err)
    })
}

module.exports = conversion
module.exports.createDriverAssociations = createAssociations
