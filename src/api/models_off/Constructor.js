const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Constructor = sequelize.define('constructor', {
  constructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  constructorRef: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Constructor
