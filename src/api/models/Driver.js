const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Driver = sequelize.define(
  'driver',
  {
    driverId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    driverRef: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    forename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: 'url',
    },
  },
  {
    tableName: 'drivers',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'driverId' }],
      },
      {
        name: 'url',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'url' }],
      },
    ],
  }
)

module.exports = Driver
