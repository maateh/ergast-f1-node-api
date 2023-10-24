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
  return getAllSeasons()
    .then(seasons => {
      const convertedSeasons = seasons.map(season => {
        return new Season({
          year: season.year,
          wiki: season.url,
          // weekends:
        })
      })
      // console.log('convertedSeasons: ', convertedSeasons)

      return Season.insertMany(convertedSeasons)
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
