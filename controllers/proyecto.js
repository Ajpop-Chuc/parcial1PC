const Proyecto = require('../models/proyecto');

exports.create = async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body);
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el proyecto', error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos', error });
  }
};

exports.getById = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      res.status(200).json(proyecto);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el proyecto', error });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Proyecto.update(req.body, {
      where: { idProyecto: req.params.id },
    });
    if (updated) {
      const updatedProyecto = await Proyecto.findByPk(req.params.id);
      res.status(200).json(updatedProyecto);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el proyecto', error });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Proyecto.destroy({
      where: { idProyecto: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proyecto', error });
  }
};
