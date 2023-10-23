const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const DriverStandings = sequelize.define(
  'driverStandings',
  {
    driverStandingsId: {
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
    points: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    positionText: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'driverstandings',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'driverStandingsId' }],
      },
    ],
  }
)

module.exports = DriverStandings
