const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const ConstructorStandings = sequelize.define(
  'constructorStandings',
  {
    constructorStandingsId: {
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
    constructorId: {
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
    tableName: 'constructorstandings',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'constructorStandingsId' }],
      },
    ],
  }
)

module.exports = ConstructorStandings
