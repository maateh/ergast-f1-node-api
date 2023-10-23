const Circuit = require('../models/circuit')
const Season = require('../models/season')
const Weekend = require('../models/weekend')

const createDummyCircuit = () => {
  Circuit.create({
    ref: 'dummy_circuit_id',
    name: 'DUMMY CIRCUIT',
    wiki: 'dummy.url.com',
    location: {
      country: 'DUMMY COUNTRY',
      locality: 'DUMMY CITY',
      lat: 1.5,
      lng: 1.0,
      alt: 1
    }
  })
}

const createDummySeason = () => {
  Season.create({
    year: 6969,
    wiki: 'dummy.url.com',
    weekends: [
      new Weekend({
        year: 6969,
        round: 69,
        name: 'DUMMY_WEEKEND',
        date: new Date(),
        time: new Date(),
        wiki: 'dummy.url.com',
        circuit: new Circuit({
          ref: 'dummy_circuit_id',
          name: 'DUMMY_CIRCUIT',
          wiki: 'dummy.url.com',
          location: {
            country: 'DUMMY COUNTRY',
            locality: 'DUMMY CITY',
            lat: 1.5,
            lng: 1.0,
            alt: 1
          }
        })
      }),
      new Weekend({
        year: 6969,
        round: 69,
        name: 'DUMMY_WEEKEND',
        date: new Date(),
        time: new Date(),
        wiki: 'dummy.url.com',
        circuit: new Circuit({
          ref: 'dummy_circuit_id',
          name: 'DUMMY_CIRCUIT',
          wiki: 'dummy.url.com',
          location: {
            country: 'DUMMY COUNTRY',
            locality: 'DUMMY CITY',
            lat: 1.5,
            lng: 1.0,
            alt: 1
          }
        })
      }),
    ]
  })
}

const createDummyWeekend = () => {
  Weekend.create({
    year: 6969,
    round: 69,
    name: 'DUMMY_WEEKEND',
    date: new Date(),
    time: new Date(),
    wiki: 'dummy.url.com',
    circuit: new Circuit({
      ref: 'dummy_circuit_id',
      name: 'DUMMY_CIRCUIT',
      wiki: 'dummy.url.com',
      location: {
        country: 'DUMMY COUNTRY',
        locality: 'DUMMY CITY',
        lat: 1.5,
        lng: 1.0,
        alt: 1
      }
    })
  })
}

module.exports = {
  createDummyCircuit,
  createDummySeason,
  createDummyWeekend
}
