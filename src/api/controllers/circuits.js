// models
const Circuit = require('../models/circuit')
const Weekend = require('../models/weekend')

const getAllCircuits = (req, res, next) => {
  const { limit, offset } = req.query

  Circuit.find()
    .sort({ name: 1 })
    .skip(offset)
    .limit(limit)
    .then(circuits => {
      res.status(200).json(circuits)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getAllCircuits: ', err)
    })
}

const getCircuitsWithinASeason = (req, res, next) => {
  const { year } = req.params

  Weekend.find({ year }).populate('circuit._circuit')
    .then(weekends => {
      const circuits = weekends.map(w => w.circuit._circuit)

      res.status(200).json(circuits)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getCircuitsWithinASeason: ', err)
    })
}

const getCircuitsWithinAWeekend = (req, res, next) => {
  const { year, round } = req.params

  Weekend.findOne({ year, round }).populate('circuit._circuit')
    .then(weekend => {
      const circuit = weekend.circuit._circuit

      res.status(200).json(circuit)
    })
    .catch(err => {
      // TODO: error handling
      console.log('getCircuitsWithinAWeekend: ', err)
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

module.exports = {
  getAllCircuits,
  getCircuitsWithinASeason,
  getCircuitsWithinAWeekend,
  getCircuitInformation
}
