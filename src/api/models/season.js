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
  weekends: [{
    type: Schema.Types.ObjectId,
    ref: 'Weekend'
  }]
})

module.exports = model('Season', seasonSchema)
