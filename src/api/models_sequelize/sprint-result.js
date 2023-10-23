const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const SprintResult = sequelize.define(
  'sprint-result',
  {
    sprintResultId: {
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
      allowNull: false,
      defaultValue: 0,
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
    fastestLapTime: {
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
    tableName: 'sprintresults',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'sprintResultId' }],
      },
      {
        name: 'raceId',
        using: 'BTREE',
        fields: [{ name: 'raceId' }],
      },
    ],
  }
)

module.exports = SprintResult
