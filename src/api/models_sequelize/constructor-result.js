const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const ConstructorResult = sequelize.define(
  'constructorResult',
  {
    constructorResultsId: {
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
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'constructorresults',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'constructorResultsId' }],
      },
    ],
  }
)

module.exports = ConstructorResult
