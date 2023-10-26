const db = require('../database/mysql')

// models
const Constructor = require('../../api/models/constructor')
const Season = require('../../api/models/season')
const RaceResult = require('../../api/models/raceResult')

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
      console.info('Inserting constructors...')
      return Constructor.insertMany(convertedConstructors)
    })
    .then(() => console.info('Constructors conversion done!\n'))
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

const createAssociations = () => {
  console.info('Creating associations to the Constructor model...')

  return Promise.all([
    Constructor.find(),
    Season.find().populate('_weekends'),
    RaceResult.find().populate('_weekend'),
  ])
    .then(([constructors, seasons, results]) => {
      return constructors.map(constructor => {
        const constructorSeasons = seasons.filter(s => s._constructors.includes(constructor._id))
        const constructorResults = results.filter(r => r._constructor.equals(constructor._id))

        const parsedSeasons = constructorSeasons.map(s => {
          const constructorWeekends = s._weekends.filter(w => w._constructors.includes(constructor._id))
          return {
            year: s.year,
            _season: s._id,
            weekends: constructorWeekends.map(w => {
              return {
                round: w.round,
                _weekend: w._id,
                _drivers: constructorResults
                  .filter(r => {
                    return r._weekend._id.equals(w._id) && r._constructor.equals(constructor._id)
                  })
                  .map(r => r._driver)
              }
            })
          }
        })

        const circuits = new Set(constructorResults.map(r => r._weekend._circuit.toString()))

        constructor.seasons = parsedSeasons
        constructor._circuits = Array.from(circuits)
        return constructor
      })
    })
    .then(updatedConstructors => {
      console.info('Saving constructors...')
      return Constructor.bulkSave(updatedConstructors)
    })
    .then(() => {
      console.info('Associations is created successfully for the Constructor model!\n')
    })
    .catch(err => {
      console.error('Association creation error: ', err)
    })
}

module.exports = conversion
module.exports.createConstructorAssociations = createAssociations
