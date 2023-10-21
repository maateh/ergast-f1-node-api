const Constructor = require('../models/constructor')
const Season = require('../models/season')
const Race = require('../models/race')

module.exports = {
  getAllConstructors: (req, res, next) => {
    Constructor.findAll()
      .then(constructors => {
        res.status(200).json(constructors)
      })
      .catch(err => {
        // TODO: error handling
        res.status(400).json({ success: false })
        console.log('getAllConstructors: ', err)
      })
  },
  getConstructorInformation: (req, res, next) => {
    const { id } = req.params

    Constructor.findOne({ where: { constructorRef: id }})
      .then(constructor => {
        res.status(200).json(constructor)
      })
      .catch(err => {
        // TODO: error handling
        res.status(400).json({ success: false })
        console.log('getConstructorInformation: ', err)
      })
  },
  getConstructorsWithinAYear: (req, res, next) => {
    const { year } = req.params

    // TODO: create associations
    // Season.findOne({ where: { year }})
    //   .then(constructors => {
    //     res.status(200).json(constructors)
    //   })
    //   .catch(err => {
    //     // TODO: error handling
    //     console.log('getConstructorsWithinAYear: ', err)
    //   })
    res.status(200).json({ success: true })
  },
  getConstructorsWithinARace: (req, res, next) => {
    const { year, round } = req.params

    // TODO: create associations
    // Race.findOne({ where: { year, round }})
    //   .then(constructors => {
    //     res.status(200).json(constructors)
    //   })
    //   .catch(err => {
    //     // TODO: error handling
    //     console.log('getConstructorsWithinARace: ', err)
    //   })
    res.status(200).json({ success: true })
  }
}
