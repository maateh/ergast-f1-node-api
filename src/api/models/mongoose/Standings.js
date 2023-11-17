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
        required: false
      },
      _driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: false
      }
    },
    teams: [{
      ref: {
        type: String,
        required: false // TODO: add teams
      },
      _team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: false // TODO: add teams
      }
    }],
    ...standingResultSchema.obj
  }],
  teamStandings: [{
    _id: false,
    team: {
      ref: {
        type: String,
        required: false
      },
      _team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: false
      }
    },
    drivers: [{
      ref: {
        type: String,
        required: false // TODO: add drivers
      },
      _driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: false // TODO: add drivers
      }
    }],
    ...standingResultSchema.obj
  }]
})

module.exports = model('Standings', standingsSchema)
