const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('f1db', 'ergast_f1', 'ergast_f1', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize
