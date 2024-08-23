const express = require('express');
const router = express.Router();
const alertasController = require('../controllers/alertas');


router.get('/', alertasController.getAll);
router.post('/', alertasController.create);
router.put('/desactivar/:id', alertasController.desactivar);
router.put('/:id', alertasController.update);

module.exports = router;
