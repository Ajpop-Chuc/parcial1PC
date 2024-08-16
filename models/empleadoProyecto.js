const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empleado = require('./Empleado');
const Proyecto = require('./proyecto');

const empleadoProyecto = sequelize.define('empleado_proyecto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaAsignacion: {
    type: DataTypes.DATE
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
    references: {
      model: Empleado,
      key: 'idEmpleado'
    },
    onDelete: 'CASCADE'
  },
  idProyecto: {
    type: DataTypes.INTEGER,
    references: {
      model: Proyecto,
      key: 'idProyecto'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'empleado_proyecto',
  timestamps: false
});

Empleado.hasMany(empleadoProyecto, { foreignKey: 'idEmpleado' });
Proyecto.hasMany(empleadoProyecto, { foreignKey: 'idProyecto' });
empleadoProyecto.belongsTo(Empleado, { foreignKey: 'idEmpleado' });
empleadoProyecto.belongsTo(Proyecto, { foreignKey: 'idProyecto' });

module.exports = empleadoProyecto;
