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
  // _weekends: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Weekend'
  // }],
  // _drivers: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Driver'
  // }],
  // _constructors: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Constructor'
  // }]
})

module.exports = model('Season', seasonSchema)
