// models
const Season = require('../../models/season')

const getTeamsWithinASeason = async (req, res, next) => {
  const { year } = req.params
  const { limit, offset } = res.locals.pagination

  try {
    const season = Season.findOne({ year }, {
      'teams._team': true
    })
      .populate('teams._team')
      // TODO
      // .sort()
      // .skip(offset)
      // .limit(limit)
    const teams = season.teams.map(t => t._team)

    // TODO: don't return the whole driver document
    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: teams.length
      },
      teams
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err.message })
    console.log('getTeamsWithinASeason: ', err)
  }
}

module.exports = getTeamsWithinASeason
