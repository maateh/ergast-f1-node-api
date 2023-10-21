const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const Status = sequelize.define(
  'status',
  {
    statusId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    tableName: 'status',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'statusId' }],
      },
    ],
  }
)

module.exports = Status
