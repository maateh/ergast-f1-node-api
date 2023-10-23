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
}

const getCircuitInformation = (req, res, next) => {
  const { id } = req.params

  Circuit.findOne({ ref: id })
    .then(circuit => {
      res.status(200).json(circuit)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getCircuitInformation: ', err)
    })
}

const getCircuitsWithinASeason = (req, res, next) => {
  const { year } = req.params
  res.status(200).json({ success: true })

  // Season.findOne({ year })
  //   .populate('circuits')
  //   .then(season => {
  //     res.status(200).json(season.circuits)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     res.status(400).json({ success: false })
  //     console.log('getCircuitsWithinASeason: ', err)
  //   })
}

const getCircuitsWithinAWeekend = (req, res, next) => {
  const { year, round } = req.params
  res.status(200).json({ success: true })

  // Weekend.findOne({ where: { year, round }})
  //   .populate('circuit')
  //   .then(circuits => {
  //     res.status(200).json(circuits)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('getCircuitsWithinAWeekend: ', err)
  //   })
}

module.exports = {
  getAllCircuits,
  getCircuitInformation,
  getCircuitsWithinASeason,
  getCircuitsWithinAWeekend
}
