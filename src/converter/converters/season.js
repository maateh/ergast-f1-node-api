const db = require('../database/mysql')

// models
const Season = require('../../api/models/season')
// const RaceResult = require('../../api/models/raceResult')

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
    .then(() => console.info('Seasons conversion done!\n'))
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

// const createAssociations = () => {
//   console.info('Creating associations to the Season model...')
//   return Promise.all([
//     Season.find(),
//     RaceResult.find().populate(['_weekend', '_driver', '_constructor']),
//   ])
//     .then(([seasons, results]) => {
//       return seasons.map(season => {
//         const seasonResults = results.filter(r => r._weekend.year === season.year)

//         const drivers = new Set(seasonResults.map(r => r._driver._id))
//         const constructors = new Set(seasonResults.map(r => r._constructor._id))

//         season._drivers = Array.from(drivers)
//         season._constructors = Array.from(constructors)
//         return season
//       })
//     })
//     .then(updatedSeasons => {
//       console.info('Saving seasons...')
//       return Season.bulkSave(updatedSeasons)
//     })
//     .then(() => {
//       console.info('Associations is created successfully for the Season model!\n')
//     })
//     .catch(err => {
//       console.error('Association creation error: ', err)
//     })
// }

module.exports = conversion
// module.exports.createSeasonAssociations = createAssociations
