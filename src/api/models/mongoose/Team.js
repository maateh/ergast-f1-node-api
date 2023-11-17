const { Schema, model } = require('mongoose')

const teamSchema = new Schema({
  ergastId: {
    type: Number,
    required: false,
    unique: true
  },
  ref: {
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
  wiki: {
    type: String,
    required: true
  }
})

teamSchema.methods.simplify = function() {
  return simplify(this)
}

const simplify = team => {
  return {
    id: team.ref,
    name: team.name,
    nationality: team.nationality,
    wiki: team.wiki
  }
}

module.exports = model('Team', teamSchema)
module.exports.simplifyTeam = simplify
