const db = require('../database/mysql')

// models
const Driver = require('../../api/models/driver')

const getAllDrivers = () => {
  const query = 'SELECT * FROM drivers'

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
        const convertedDriver = new Driver({
          ergastId: driver.driverId,
          ref: driver.driverRef,
          name: {
            firstName: driver.forename,
            lastName: driver.surname
          },
          dateOfBirth: driver.dob,
          nationality: driver.nationality,
          wiki: driver.url
        })

        if (driver.number) {
          convertedDriver.number = driver.number
        }
        if (driver.code) {
          convertedDriver.code = driver.code
        }
        return convertedDriver
      })
    })
    .then(convertedDrivers => {
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
