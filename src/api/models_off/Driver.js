const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Driver = sequelize.define('driver', {
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  driverRef: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  forename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true
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

module.exports = Driver
