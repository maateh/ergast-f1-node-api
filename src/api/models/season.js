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
  return {
    year: this.year,
    wiki: this.wiki
  }
}

module.exports = model('Season', seasonSchema)
