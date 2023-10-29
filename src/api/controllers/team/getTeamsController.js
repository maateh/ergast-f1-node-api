// models
const Team = require('../../models/team')

const getTeamsController = async (req, res, next) => {
  const { limit, offset } = res.locals.pagination

  try {
    const total = await Team.countDocuments()
    const teams = await Team.find()
      .sort({ name: 1 })
      .skip(offset)
      .limit(limit)

    // TODO: don't return the whole team document
    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total
      },
      teams
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err.message })
    console.log('getTeamsController: ', err)
  }
}

module.exports = getTeamsController
