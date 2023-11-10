// services
const filterLaps = require('../../services/filter/filterLaps')

const getLaps = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { laps, total } = await filterLaps(filter.laps, pagination, {
      lap: 1,
      position: 1
    })

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      laps
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getLaps
}
