const Circuit = require('../models/Circuit')

const MOCK_CIRCUIT = new Circuit({
  circuitId: 'circuitId',
  circuitRef: 'circuitRef',
  name: 'name',
  location: 'location',
  country: 'country',
  lat: 'lat',
  lng: 'lng',
  alt: 'alt',
  url: 'url'
})

module.exports = {
  getAllCircuits: (req, res, next) => {
    res.status(200).json([
      MOCK_CIRCUIT,
      MOCK_CIRCUIT,
      MOCK_CIRCUIT
    ])
  },
  getCircuitInformation: (req, res, next) => {
    res.status(200).json(MOCK_CIRCUIT)
  },
  getCircuitsWithinAYear: (req, res, next) => {
    res.status(200).json([
      MOCK_CIRCUIT,
      MOCK_CIRCUIT,
      MOCK_CIRCUIT
    ])
  },
  getCircuitsWithinARace: (req, res, next) => {
    res.status(200).json([
      MOCK_CIRCUIT,
      MOCK_CIRCUIT,
      MOCK_CIRCUIT
    ])
  }
}
