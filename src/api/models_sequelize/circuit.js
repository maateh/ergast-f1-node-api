const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Circuit = sequelize.define(
  'circuit',
  {
    circuitId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    circuitRef: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    alt: {
      type: DataTypes.INTEGER,
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
    tableName: 'circuits',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'circuitId' }],
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

module.exports = Circuit
