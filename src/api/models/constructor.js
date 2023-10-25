const { Schema, model } = require('mongoose')

const constructorSchema = new Schema({
  ergastId: { // <- constructorId
    type: Number,
    required: true
  },
  ref: { // <- constructorRef
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  seasons: [{
    year: {
      type: Number,
      required: true
    },
    _season: {
      type: Schema.Types.ObjectId,
      ref: 'Season',
      required: true
    },
    weekends: [{
      round: {
        type: Number,
        required: true
      },
      _weekend: {
        type: Schema.Types.ObjectId,
        ref: 'Weekend',
        required: true
      },
      _drivers: [{
        type: Schema.Types.ObjectId,
        ref: 'Driver'
      }],
      // _results: [{
      //   type: Schema.Types.ObjectId,
      //   ref: 'Result'
      // }]
    }]
  }],
  _circuits: [{
    type: Schema.Types.ObjectId,
    ref: 'Circuit',
    unique: true
  }]
})

module.exports = model('Constructor', constructorSchema)
