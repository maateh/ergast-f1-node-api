const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Circuit = sequelize.define('circuit', {
  circuitId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  circuitRef: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // TODO: create Location model
  // location: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Circuit
