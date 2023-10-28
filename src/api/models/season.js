const { Schema, model } = require('mongoose')

const seasonSchema = new Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  drivers: [{
    ref: {
      type: String,
      required: true
    },
    _driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    }
  }],
  teams: [{
    ref: {
      type: String,
      required: true
    },
    _team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  }]
})

module.exports = model('Season', seasonSchema)
