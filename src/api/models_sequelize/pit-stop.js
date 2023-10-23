const { DataTypes } = require('sequelize')

const sequelize = require('../database/database')

const PitStop = sequelize.define('pitStop', {
    raceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stop: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lap: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'pitstops',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "raceId" },
          { name: "driverId" },
          { name: "stop" },
        ]
      },
      {
        name: "raceId",
        using: "BTREE",
        fields: [
          { name: "raceId" },
        ]
      },
]
})

module.exports = PitStop
