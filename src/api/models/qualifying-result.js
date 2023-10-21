const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const QualifyingResult = sequelize.define(
  'qualifyingResult',
  {
    qualifyId: {
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
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    q1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    q2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    q3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'qualifying',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'qualifyId' }],
      },
    ],
  }
)

module.exports = QualifyingResult
