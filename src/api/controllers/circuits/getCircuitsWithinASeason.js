// models
const Weekend = require('../../models/weekend')

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

module.exports = getCircuitsWithinASeason
