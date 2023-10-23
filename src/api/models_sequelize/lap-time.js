const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const LapTime = sequelize.define(
  'lapTime',
  {
    raceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    lap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    time: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'laptimes',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'raceId' }, { name: 'driverId' }, { name: 'lap' }],
      },
      {
        name: 'raceId',
        using: 'BTREE',
        fields: [{ name: 'raceId' }],
      },
      {
        name: 'raceId_2',
        using: 'BTREE',
        fields: [{ name: 'raceId' }],
      },
    ],
  }
)

module.exports = LapTime
