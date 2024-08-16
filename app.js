const express = require('express');
const sequelize = require('./config/database');
const empleadoRoutes = require('./routes/empleado');
const proyectoRoutes = require('./routes/proyecto');
const asignacionRoutes = require('./routes/empleadoProyecto');

const app = express();
app.use(express.json());

app.use('/api/empleados',empleadoRoutes);
app.use('/api/proyectos',proyectoRoutes);
app.use('/api/asignacion',asignacionRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Conexion con la BD exitosa');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
