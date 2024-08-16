const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/empleadoProyecto');

// Rutas para asignaciones
router.post('/', asignacionController.create);
router.get('/', asignacionController.getAll);
router.get('/:id', asignacionController.getById);
router.put('/:id', asignacionController.update);
router.delete('/:id', asignacionController.delete);

module.exports = router;
