const { Schema, model } = require('mongoose')

const teamSchema = new Schema({
  ergastId: { // <- constructorId
    type: Number,
    required: false,
    unique: true
  },
  ref: { // <- constructorRef
    type: String,
    required: true,
    unique: true
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
  _circuits: [{
    type: Schema.Types.ObjectId,
    ref: 'Circuit'
  }]
})

module.exports = model('Team', teamSchema)
