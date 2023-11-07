const { Schema, model } = require('mongoose')

// schemas
const sessionSchema = require('./schemas/sessionSchema')

// models
// const { simplifyCircuit } = require('./Circuit')
// const { simplifySeason } = require('./Season')

const weekendSchema = new Schema({
  ergastId: {
    type: Number,
    required: false,
    unique: true
  },
  season: {
    year: {
      type: Number,
      required: true
    },
    _season: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  round: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  wiki: {
    type: String,
    required: true
  },
  sessions: [sessionSchema],
  circuit: {
    ref: {
      type: String,
      required: true
    },
    _circuit: {
      type: Schema.Types.ObjectId,
      ref: 'Circuit',
      required: true
    }
  }
})

weekendSchema.methods.simplify = function() {
  return simplify(this)
}

const simplify = weekend => {
  return {
    year: weekend.season.year,
    round: weekend.round,
    name: weekend.name,
    wiki: weekend.wiki,
    sessions: weekend.sessions,
    // season: simplifySeason(weekend.season._season),
    // circuit: simplifyCircuit(weekend.circuit._circuit)
  }
}

module.exports = model('Weekend', weekendSchema)
module.exports.simplifyWeekend = simplify
