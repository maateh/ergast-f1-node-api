const { model } = require('mongoose')

const standingsSchema = require('./schemas/standingsSchema')

module.exports = model('DriverStandings', standingsSchema)
