const express = require('express');
const sequelize = require('./config/database');
const empleadoRoutes = require('./routes/empleado');
const proyectoRoutes = require('./routes/proyecto');
const asignacionRoutes = require('./routes/empleadoProyecto');
const alertasRoutes = require('./routes/alertas');

const app = express();
app.use(express.json());

app.use('/api/empleados', empleadoRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/asignacion', asignacionRoutes);
app.use('/api/alerta', alertasRoutes);

// Mover la sincronización de la base de datos y el inicio del servidor a una función separada
const initializeServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Conexion con la BD exitosa');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

// Solo iniciar el servidor si no estamos en modo de prueba
if (process.env.NODE_ENV !== 'test') {
  initializeServer().then(() => {
    app.listen(3000, () => {
      console.log('Servidor escuchando en el puerto 3000');
    });
  });
}

module.exports = app;