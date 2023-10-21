const Circuit = require('../models/circuit')
const Season = require('../models/season')
const Race = require('../models/race')

const getAllCircuits = (req, res, next) => {
  Circuit.findAll()
    .then(circuits => {
      res.status(200).json(circuits)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('err-getAllCircuits: ', err)
    })
}

const getCircuitInformation = (req, res, next) => {
  const { id } = req.params

  Circuit.findOne({ where: { circuitRef: req.params.id }})
    .then(circuit => {
      res.status(200).json(circuit)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('err-getCircuitInformation: ', err)
    })
}

const getCircuitsWithinAYear = (req, res, next) => {
  const { year } = req.params

  // TODO: create associations
  // Season.findOne({ where: { year: req.params.year }})
  //   .then(season => {
  //     return season.getCircuits()
  //   })
  //   .then(circuits => {
  //     res.status(200).json(circuits)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     res.status(400).json({ success: false })
  //     console.log('err-getCircuitsWithinAYear: ', err)
  //   })
}

const getCircuitsWithinARace = (req, res, next) => {
  const { year, round } = req.params

  // TODO: create associations
  // Race.findOne({ where: { year, round }})
  //   .then(circuits => {
  //     res.status(200).json(circuits)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('err-getCircuitsWithinARace: ', err)
  //   })
  res.status(200).json({ success: true })
}

module.exports = {
  getAllCircuits,
  getCircuitInformation,
  getCircuitsWithinAYear,
  getCircuitsWithinARace
}
