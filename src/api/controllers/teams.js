const getAllTeams = (req, res, next) => {
  res.status(200).json({ success: true })

  // Team.findAll()
  //   .then(teams => {
  //     res.status(200).json(teams)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     res.status(400).json({ success: false })
  //     console.log('getAllTeams: ', err)
  //   })
}

const getTeamInformation = (req, res, next) => {
  const { id } = req.params
  res.status(200).json({ success: true })

  // Team.findOne({ where: { constructorRef: id }})
  //   .then(team => {
  //     res.status(200).json(team)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     res.status(400).json({ success: false })
  //     console.log('getTeamInformation: ', err)
  //   })
}

const getTeamsWithinASeason = (req, res, next) => {
  const { year } = req.params
  res.status(200).json({ success: true })

  // TODO: create associations
  // Season.findOne({ where: { year }})
  //   .then(teams => {
  //     res.status(200).json(teams)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('getTeamsWithinASeason: ', err)
  //   })
}

const getTeamsWithinAWeekend = (req, res, next) => {
  const { year, round } = req.params
  res.status(200).json({ success: true })

  // TODO: create associations
  // Weekend.findOne({ where: { year, round }})
  //   .then(teams => {
  //     res.status(200).json(teams)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('getTeamsWithinAWeekend: ', err)
  //   })
}

module.exports = {
  getAllTeams,
  getTeamInformation,
  getTeamsWithinASeason,
  getTeamsWithinAWeekend
}
