const db = require('../database/mysql')

// models
const Season = require('../../api/models/season')
const Weekend = require('../../api/models/weekend')

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
  return Promise.all([
    getAllSeasons(),
    Weekend.find()
  ])
    .then(([seasons, weekends]) => {
      return seasons.map(season => {
        return new Season({
          year: season.year,
          wiki: season.url,
          _weekends: weekends.filter(w => w.year === +season.year),
          // _drivers: ,
          // _constructors: ,
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
