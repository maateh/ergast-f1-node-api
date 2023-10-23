const { Schema, model } = require('mongoose')

const weekendSchema = new Schema({
  // raceId: { -> _id
  //   type: Number,
  //   required: true
  // },
  year: {
    type: Number,
    required: true
  },
  round: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
    required: false
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  circuit: {
    type: Schema.Types.ObjectId,
    ref: 'Circuit',
    required: true
  },
  sessions: {
    type: [{
      key: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      time: {
        type: Date,
        required: false
      }
    }],
    required: false
  }
})

module.exports = model('Weekend', weekendSchema)
