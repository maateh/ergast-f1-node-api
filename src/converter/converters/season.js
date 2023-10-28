const db = require('../database/mysql')

// models
const Season = require('../../api/models/season')
const RaceResult = require('../../api/models/raceResult')

// utils
const { arrayMapper } = require('../utils/mapper')

const getAllSeasons = () => {
  const query = 'SELECT * FROM seasons'

  console.info('Get seasons from the SQL Database...')
  return db.execute(query)
    .then(([seasons]) => seasons)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Seasons conversion started...')
  return getAllSeasons()
    .then(seasons => {
      console.info('Converting seasons...')

      return seasons.map(season => {
        return new Season({
          year: season.year,
          wiki: season.url
        })
      })
    })
    .then(convertedSeasons => {
      console.info('Inserting seasons...')
      return Season.insertMany(convertedSeasons)
    })
    .then(() => {
      console.info('Seasons conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

const createAssociations = () => {
  console.info('Creating associations to the Season model...')

  return Promise.all([
    Season.find(),
    RaceResult.find()
  ])
    .then(([seasons, results]) => {
      const resultsMap = arrayMapper(results, ['weekend', '_season'])

      return seasons.map(season => {
        const seasonResults = resultsMap.get(season._id.toString())

        const drivers = seasonResults.map(r => ({
          ref: r.driver.ref,
          _driver: r.driver._driver.toString()
        }))
        const teams = seasonResults.map(r => ({
          ref: r.team.ref,
          _team: r.team._team.toString()
        }))

        season.drivers = [...new Map(drivers.map(d => [d._driver, d])).values()]
        season.teams = [...new Map(teams.map(t => [t._team, t])).values()]
        return season
      })
    })
    .then(updatedSeasons => {
      console.info('Saving seasons...')
      return Season.bulkSave(updatedSeasons)
    })
    .then(() => {
      console.info('Associations is created successfully for the Season model!')
    })
    .catch(err => {
      console.error('Association creation error: ', err)
    })
}

module.exports = conversion
module.exports.createSeasonAssociations = createAssociations
