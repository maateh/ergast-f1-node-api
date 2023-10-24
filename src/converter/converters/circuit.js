const db = require('../database/mysql')

// models
const Circuit = require('../../api/models/circuit')

const getAllCircuits = () => {
  const query = 'SELECT * FROM circuits'

  return db.execute(query)
    .then(([circuits]) => circuits)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  return getAllCircuits()
    .then(circuits => {
      const convertedCircuits = circuits.map(circuit => {
        return new Circuit({
          ergastId: circuit.circuitId,
          name: circuit.name,
          ref: circuit.circuitRef,
          wiki: circuit.url,
          location: {
            country: circuit.country,
            locality: circuit.location,
            lat: circuit.lat,
            lng: circuit.lng,
            alt: circuit.alt || 0
          }
        })
      })
      // console.log('convertedCircuits: ', convertedCircuits)

      return Circuit.insertMany(convertedCircuits)
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
