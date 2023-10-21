const Circuit = require('../models/circuit')
const Season = require('../models/season')
const Race = require('../models/race')

module.exports = {
  getAllCircuits: (req, res, next) => {
    Circuit.findAll()
      .then(circuits => {
        res.status(200).json(circuits)
      })
      .catch(err => {
        // TODO: error handling
        console.log('err-getAllCircuits: ', err)
      })
  },
  getCircuitInformation: (req, res, next) => {
    Circuit.findOne({ where: { circuitRef: req.params.id }})
      .then(circuit => {
        res.status(200).json(circuit)
      })
      .catch(err => {
        // TODO: error handling
        console.log('err-getCircuitInformation: ', err)
      })
  },
  getCircuitsWithinAYear: (req, res, next) => {
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
    //     console.log('err-getCircuitsWithinAYear: ', err)
    //   })
  },
  getCircuitsWithinARace: (req, res, next) => {
    // TODO: create associations
    res.status(200).json({})
  }
}
