const Circuit = require('../models/circuit')
const Season = require('../models/season')
const Weekend = require('../models/weekend')

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

const getCircuitsWithinASeason = (req, res, next) => {
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
  //     console.log('err-getCircuitsWithinASeason: ', err)
  //   })
}

const getCircuitsWithinAWeekend = (req, res, next) => {
  const { year, round } = req.params

  // TODO: create associations
  // Weekend.findOne({ where: { year, round }})
  //   .then(circuits => {
  //     res.status(200).json(circuits)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('err-getCircuitsWithinAWeekend: ', err)
  //   })
  res.status(200).json({ success: true })
}

module.exports = {
  getAllCircuits,
  getCircuitInformation,
  getCircuitsWithinASeason,
  getCircuitsWithinAWeekend
}
