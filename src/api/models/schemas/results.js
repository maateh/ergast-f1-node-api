const { Schema } = require('mongoose')

const resultsSchema = new Schema({
  _weekend: {
    type: Schema.Types.ObjectId,
    ref: 'Weekend',
    required: true
  },
  qualifying: [{
    type: Schema.Types.ObjectId,
    ref: 'QualifyingResult'
  }],
  race: [{
    type: Schema.Types.ObjectId,
    ref: 'RaceResult'
  }],
  sprint: [{
    type: Schema.Types.ObjectId,
    ref: 'SprintResult'
  }]
})

module.exports = resultsSchema
