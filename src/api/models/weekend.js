const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Weekend = sequelize.define(
  'weekend',
  {
    raceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    circuitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: 'url',
    },
    fp1_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fp1_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    fp2_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fp2_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    fp3_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fp3_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    quali_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    quali_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    sprint_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    sprint_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    tableName: 'races',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'raceId' }],
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

module.exports = Weekend
