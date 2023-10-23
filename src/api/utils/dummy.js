const Circuit = require('../models/circuit')

const createCircuit = () => {
  Circuit.create({
    ref: 'dummy_circuit_id',
    name: 'DUMMY CIRCUIT',
    url: 'dummy.url.com',
    location: {
      country: 'DUMMY COUNTRY',
      locality: 'DUMMY CITY',
      lat: 1.5,
      lng: 1.0,
      alt: 1
    }
  })
}

module.exports = {
  createCircuit
}
