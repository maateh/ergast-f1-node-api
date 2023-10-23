const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const RaceResult = sequelize.define(
  'raceResult',
  {
    resultId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    raceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    constructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    grid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    positionText: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    positionOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    points: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    laps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    time: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fastestLap: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    fastestLapTime: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fastestLapSpeed: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'results',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'resultId' }],
      },
    ],
  }
)

module.exports = RaceResult
