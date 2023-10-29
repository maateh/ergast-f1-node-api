// models
const Circuit = require('../../models/circuit')

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

module.exports = getCircuitInformation
