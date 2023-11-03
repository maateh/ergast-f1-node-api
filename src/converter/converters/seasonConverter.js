const db = require('../database/mysql')

// models
const Season = require('../../api/models/Season')

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

module.exports = conversion
