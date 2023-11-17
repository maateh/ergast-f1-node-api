// models
const Season = require('../../models/mongoose/Season')
const SeasonResponse = require('../../models/response/SeasonResponse')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getSeasons = async (req, res, next) => {
  const { metadata, pagination } = res.locals

  try {
    const total = await Season.countDocuments()
    const seasons = await Season.find()
      .collation({ locale: 'en' })
      .sort('year')
      .skip(pagination.offset)
      .limit(pagination.limit)

    if (!seasons || !seasons.length) {
      throw new DataNotFoundError('Seasons')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      seasons: SeasonResponse.parseList(seasons)
    })
  } catch (err) {
    next(err)
  }
}

const getSeason = async (req, res, next) => {
  const { metadata } = res.locals
  const { year } = req.params

  try {
    const season = await Season.findOne({ year })

    if (!season) {
      throw new DataNotFoundError('Season')
    }

    res.json({
      metadata,
      season: new SeasonResponse(season)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getSeasons,
  getSeason
}
