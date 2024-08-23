const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alertas = sequelize.define('alertas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaEntrega: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estadoActivo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'alertas',
  timestamps: false
});

module.exports = Alertas;
