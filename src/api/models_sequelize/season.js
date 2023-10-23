const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Season = sequelize.define(
  'season',
  {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: 'url',
    },
  },
  {
    tableName: 'seasons',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'year' }],
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

module.exports = Season
