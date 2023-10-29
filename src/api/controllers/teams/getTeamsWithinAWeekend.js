// models
const Weekend = require('../../models/weekend')

const getTeamsWithinAWeekend = async (req, res, next) => {
  const { year, round } = req.params
  const { limit, offset } = res.locals.pagination

  try {
    const weekend = await Weekend.findOne({ year, round }, {
      'teams._team': true
    })
      .populate('teams._team')
      // TODO
      // .sort()
      // .skip(offset)
      // .limit(limit)
    const teams = weekend.teams.map(t => t._team)

    // TODO: don't return the whole team document
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
    console.log('getTeamsWithinAWeekend: ', err)
  }
}

module.exports = getTeamsWithinAWeekend
