const Circuit = require('../models/circuit')

const getAllCircuits = (req, res, next) => {
  Circuit.find()
    .then(circuits => {
      res.status(200).json(circuits)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getAllCircuits: ', err)
    })

  // Circuit.findAll()
  //   .then(circuits => {
  //     res.status(200).json(circuits)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     res.status(400).json({ success: false })
  //     console.log('err-getAllCircuits: ', err)
  //   })
}

const getCircuitInformation = (req, res, next) => {
  const { id } = req.params
  res.status(200).json({ success: true })

  // Circuit.findOne({ where: { circuitRef: req.params.id }})
  //   .then(circuit => {
  //     res.status(200).json(circuit)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     res.status(400).json({ success: false })
  //     console.log('err-getCircuitInformation: ', err)
  //   })
}

const getCircuitsWithinASeason = (req, res, next) => {
  const { year } = req.params
  res.status(200).json({ success: true })

  // TODO: create associations
  // Season.findOne({ where: { year }})
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
  res.status(200).json({ success: true })

  // TODO: create associations
  // Weekend.findOne({ where: { year, round }})
  //   .then(circuits => {
  //     res.status(200).json(circuits)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('err-getCircuitsWithinAWeekend: ', err)
  //   })
}

module.exports = {
  getAllCircuits,
  getCircuitInformation,
  getCircuitsWithinASeason,
  getCircuitsWithinAWeekend
}
