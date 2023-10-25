const db = require('../database/mysql')

// models
const Season = require('../../api/models/season')

const getAllSeasons = () => {
  const query = 'SELECT * FROM seasons'

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
          wiki: season.url,
          // weekends:
        })
      })
    })
    .then(convertedSeasons => {
      return Season.insertMany(convertedSeasons)
    })
    .then(() => console.info('Seasons conversion done!'))
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
