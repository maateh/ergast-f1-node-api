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
  return {
    id: this.ref,
    name: this.name,
    nationality: this.nationality,
    wiki: this.wiki
  }
}

module.exports = model('Team', teamSchema)
