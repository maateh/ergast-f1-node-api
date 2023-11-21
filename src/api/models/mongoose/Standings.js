const { model, Schema } = require('mongoose')

// schemas
const standingResultSchema = require('./schemas/standingResultSchema')

const standingsSchema = new Schema({
  season: {
    year: {
      type: Number,
      required: true
    },
    _season: {
      type: Schema.Types.ObjectId,
      ref: 'Season',
      required: true
    }
  },
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
  driverStandings: [{
    _id: false,
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
    teams: [{
      _id: false,
      ref: {
        type: String,
        required: true
      },
      _team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
      }
    }],
    ...standingResultSchema.obj
  }],
  teamStandings: [{
    _id: false,
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
    drivers: [{
      _id: false,
      ref: {
        type: String,
        required: true
      },
      _driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
      }
    }],
    ...standingResultSchema.obj
  }]
})

module.exports = model('Standings', standingsSchema)
