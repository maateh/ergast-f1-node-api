// models
const Team = require('../../models/Team')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getTeamsController = async (req, res, next) => {
  const { limit, offset } = res.locals.pagination

  try {
    const total = await Team.countDocuments()
    const teams = await Team.find()
      .collation({ locale: 'en' })
      .sort('name')
      .skip(offset)
      .limit(limit)

    if (!teams || !teams.length) {
      throw new DataNotFoundError('Teams')
    }

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total
      },
      teams: teams.map(t => t.simplify())
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getTeamsController
