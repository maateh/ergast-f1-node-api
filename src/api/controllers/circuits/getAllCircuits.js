// models
const Circuit = require('../../models/circuit')

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

module.exports = getAllCircuits
