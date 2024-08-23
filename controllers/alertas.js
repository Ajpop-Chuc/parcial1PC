const Alertas = require('../models/alertas');


exports.getAll = async (req, res) => {
    try {
        const alertas = await Alertas.findAll(
            {where: {estadoActivo: true}}
        );
        res.status(200).json(alertas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las alertas', error });
    }
};

exports.create = async (req, res) => {
    try {
        const alertas = await Alertas.create(req.body);
        res.status(201).json(alertas);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la alerta', error });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Alertas.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedAlerta = await Alertas.findByPk(req.params.id);
            res.status(200).json(updatedAlerta);
        } else {
            res.status(404).json({ message: 'Alerta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la alerta', error });
    }
};

exports.desactivar = async (req, res) => {
    try {
      const [updated] = await Alertas.update(
        { estadoActivo: false },  // Campos a actualizar
        { where: { id: req.params.id } }  // Condición para la actualización
      );
      
      if (updated) {
        res.status(200).json({ message: 'Alerta dada de baja' });
      } else {
        res.status(404).json({ message: 'Alerta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al desactivar alerta', error });
    }
  };
  