const { Schema, model } = require('mongoose')

const seasonSchema = new Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  wiki: {
    type: String,
    required: true
  }
})

seasonSchema.methods.simplify = function() {
  return simplify(this)
}

const simplify = season => {
  return {
    year: season.year,
    wiki: season.wiki
  }
}

module.exports = model('Season', seasonSchema)
module.exports.simplifySeason = simplify
