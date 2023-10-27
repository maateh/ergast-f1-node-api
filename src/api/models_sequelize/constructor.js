const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Team = sequelize.define(
  'team',
  {
    constructorId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    constructorRef: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: 'name',
    },
    nationality: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    tableName: 'teams',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'constructorId' }],
      },
      {
        name: 'name',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'name' }],
      },
    ],
  }
)

module.exports = Team
