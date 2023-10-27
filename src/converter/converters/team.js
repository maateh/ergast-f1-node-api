const db = require('../database/mysql')

// models
const Team = require('../../api/models/team')

const getAllConstructors = () => {
  const query = 'SELECT * FROM constructors'

  console.info('Get constructors from the MySQL Database...')
  return db.execute(query)
    .then(([constructors]) => constructors)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Teams conversion started...')
  return getAllConstructors()
    .then(constructors => {
      console.info('Converting teams...')

      return constructors.map(constructor => {
        return new Team({
          ergastId: constructor.constructorId,
          ref: constructor.constructorRef,
          name: constructor.name,
          nationality: constructor.nationality,
          wiki: constructor.url
        })
      })
    })
    .then(convertedTeams => {
      console.info('Inserting teams...')
      return Team.insertMany(convertedTeams)
    })
    .then(() => {
      console.info('Teams conversion done!\n')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
