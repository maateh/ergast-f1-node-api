const db = require('../database/mysql')

// models
const Constructor = require('../../api/models/constructor')

const getAllConstructors = () => {
  const query = 'SELECT * FROM constructors'

  return db.execute(query)
    .then(([constructors]) => constructors)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Constructors conversion started...')
  return getAllConstructors()
    .then(constructors => {
      return constructors.map(constructor => {
        return new Constructor({
          ergastId: constructor.constructorId,
          ref: constructor.constructorRef,
          name: constructor.name,
          nationality: constructor.nationality,
          wiki: constructor.url
        })
      })
    })
    .then(convertedConstructors => {
      return Constructor.insertMany(convertedConstructors)
    })
    .then(() => console.info('Constructors conversion done!'))
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
