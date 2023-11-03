const db = require('../database/mysql')

// models
const Driver = require('../../api/models/Driver')

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
      console.info('Converting drivers...')

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
          wiki: driver.url
        })
      })
    })
    .then(convertedDrivers => {
      console.info('Inserting drivers...')
      return Driver.insertMany(convertedDrivers)
    })
    .then(() => {
      console.info('Drivers conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
