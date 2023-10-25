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
  // TODO
  // drivers: {
  //   last: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Driver',
  //   }],
  //   history: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Driver'
  //   }]
  // }
})

module.exports = model('Constructor', constructorSchema)
