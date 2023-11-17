// models
const Weekend = require('../../models/mongoose/Weekend')
const WeekendResponse = require('../../models/response/WeekendResponse')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getWeekends = async (req, res, next) => {
  const { metadata, pagination } = res.locals

  try {
    const total = await Weekend.countDocuments()
    const weekends = await Weekend.find()
      .collation({ locale: 'en' })
      .sort('season.year round')
      .skip(pagination.offset)
      .limit(pagination.limit)
      .populate('season._season circuit._circuit')

    if (!weekends || !weekends.length) {
      throw new DataNotFoundError('Weekends')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      weekends: WeekendResponse.parseList(weekends)
    })
  } catch (err) {
    next(err)
  }
}

const getWeekend = async (req, res, next) => {
  const { metadata } = res.locals
  const { year, round } = req.params

  try {
    const weekend = await Weekend.findOne({
      'season.year': year,
      round
    }).populate('season._season circuit._circuit')

    if (!weekend) {
      throw new DataNotFoundError('Weekend')
    }

    res.json({
      metadata,
      weekend: new WeekendResponse(weekend)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getWeekends,
  getWeekend
}
