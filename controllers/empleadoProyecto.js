const Asignacion = require('../models/empleadoProyecto');

exports.create = async (req, res) => {
  try {
    const { idEmpleado, idProyecto } = req.body;
    
    // Verificar que el empleado no esté asignado a otro proyecto
    const existingAssignment = await Asignacion.findOne({ where: { idEmpleado } });
    if (existingAssignment) {
      return res.status(400).json({ message: 'El empleado ya está asignado a otro proyecto.' });
    }

    const asignacion = await Asignacion.create({ idEmpleado, idProyecto });
    res.status(201).json(asignacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la asignación', error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll();
    res.status(200).json(asignaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las asignaciones', error });
  }
};

exports.getById = async (req, res) => {
  try {
    const asignacion = await Asignacion.findByPk(req.params.id, {
      include: [
        { model: Empleado, attributes: ['nombre'] },
        { model: Proyecto, attributes: ['nombre'] }
      ]
    });
    if (asignacion) {
      res.status(200).json(asignacion);
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la asignación', error });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Asignacion.update(req.body, {
      where: { idAsignacion: req.params.id }
    });
    if (updated) {
      const updatedAsignacion = await Asignacion.findByPk(req.params.id);
      res.status(200).json(updatedAsignacion);
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la asignación', error });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Asignacion.destroy({
      where: { idAsignacion: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Eliminacion correcta' });
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la asignación', error });
  }
};
