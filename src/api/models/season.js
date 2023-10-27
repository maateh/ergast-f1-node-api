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
  // _teams: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Team'
  // }]
})

module.exports = model('Season', seasonSchema)
