const { Schema } = require('mongoose')

const standingsSchema = new Schema({
  weekend: {
    round: {
      type: Number,
      required: true
    },
    _weekend: {
      type: Schema.Types.ObjectId,
      ref: 'Weekend',
      required: true
    }
  },
  driver: {
    ref: {
      type: String,
      required: true
    },
    _driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    }
  },
  team: {
    ref: {
      type: String,
      required: true
    },
    _team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  },
  points: {
    type: Number,
    required: true
  },
  position: {
    order: {
      type: Number,
      required: true
    },
    info: {
      type: String,
      required: true
    }
  },
  wins: {
    type: Number,
    required: true
  }
})

module.exports = standingsSchema
