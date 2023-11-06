// models
const Season = require('../../models/Season')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getSeasonsController = async (req, res, next) => {
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
      seasons: seasons.map(s => s.simplify())
    })
  } catch (err) {
    next(err)
  }
}

const getSeasonController = async (req, res, next) => {
  const { metadata } = res.locals
  const { year } = req.params

  try {
    const season = await Season.findOne({ year })

    if (!season) {
      throw new DataNotFoundError('Season')
    }

    res.json({
      metadata,
      season: season.simplify()
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getSeasonsController,
  getSeasonController
}
