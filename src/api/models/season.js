const { Schema, model } = require('mongoose')

const seasonSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  _weekends: [{
    type: Schema.Types.ObjectId,
    ref: 'Weekend',
    unique: true
  }],
  _drivers: [{
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    unique: true
  }],
  _constructors: [{
    type: Schema.Types.ObjectId,
    ref: 'Constructor',
    unique: true
  }]
})

module.exports = model('Season', seasonSchema)
