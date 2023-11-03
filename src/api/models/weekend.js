const { Schema, model } = require('mongoose')

const dateSchema = require('./schemas/dateSchema')
const sessionSchema = require('./schemas/sessionSchema')

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
  date: {
    type: dateSchema,
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
  return {
    year: this.season.year,
    // season: this.season._season.simplify(),
    round: this.round,
    name: this.name,
    date: this.date,
    wiki: this.wiki,
    sessions: this.sessions,
    circuit: this.circuit
    // circuit: this.circuit._circuit.simplify()
  }
}

module.exports = model('Weekend', weekendSchema)
