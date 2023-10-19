const Constructor = require('../models/Constructor')

const MOCK_CONSTRUCTOR = new Constructor({
  constructorId: 'constructorId',
  constructorRef: 'constructorRef',
  name: 'name',
  nationality: 'nationality',
  url: 'url'
})

module.exports = {
  getAllConstructors: (req, res, next) => {
    res.status(200).json([
      MOCK_CONSTRUCTOR,
      MOCK_CONSTRUCTOR,
      MOCK_CONSTRUCTOR
    ])
  },
  getConstructorInformation: (req, res, next) => {
    res.status(200).json(MOCK_CONSTRUCTOR)
  },
  getConstructorsWithinAYear: (req, res, next) => {
    res.status(200).json([
      MOCK_CONSTRUCTOR,
      MOCK_CONSTRUCTOR,
      MOCK_CONSTRUCTOR
    ])
  },
  getConstructorsWithinARace: (req, res, next) => {
    res.status(200).json([
      MOCK_CONSTRUCTOR,
      MOCK_CONSTRUCTOR,
      MOCK_CONSTRUCTOR
    ])
  }
}
