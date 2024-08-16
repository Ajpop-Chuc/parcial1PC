const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto');

// Rutas para proyectos
router.post('/', proyectoController.create);
router.get('/', proyectoController.getAll);
router.get('/:id', proyectoController.getById);
router.put('/:id', proyectoController.update);
router.delete('/:id', proyectoController.delete);

module.exports = router;
