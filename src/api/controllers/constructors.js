const getAllConstructors = (req, res, next) => {
  res.status(200).json({ success: true })

  // Constructor.findAll()
  //   .then(constructors => {
  //     res.status(200).json(constructors)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     res.status(400).json({ success: false })
  //     console.log('getAllConstructors: ', err)
  //   })
}

const getConstructorInformation = (req, res, next) => {
  const { id } = req.params
  res.status(200).json({ success: true })

  // Constructor.findOne({ where: { constructorRef: id }})
  //   .then(constructor => {
  //     res.status(200).json(constructor)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     res.status(400).json({ success: false })
  //     console.log('getConstructorInformation: ', err)
  //   })
}

const getConstructorsWithinASeason = (req, res, next) => {
  const { year } = req.params
  res.status(200).json({ success: true })

  // TODO: create associations
  // Season.findOne({ where: { year }})
  //   .then(constructors => {
  //     res.status(200).json(constructors)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('getConstructorsWithinASeason: ', err)
  //   })
}

const getConstructorsWithinAWeekend = (req, res, next) => {
  const { year, round } = req.params
  res.status(200).json({ success: true })

  // TODO: create associations
  // Weekend.findOne({ where: { year, round }})
  //   .then(constructors => {
  //     res.status(200).json(constructors)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('getConstructorsWithinAWeekend: ', err)
  //   })
}

module.exports = {
  getAllConstructors,
  getConstructorInformation,
  getConstructorsWithinASeason,
  getConstructorsWithinAWeekend
}
