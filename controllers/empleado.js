const Empleado = require('../models/Empleado');


exports.getAll = async (req, res) => {
    try {
        const empleados = await Empleado.findAll();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los empleados', error });
    }
};

exports.getById = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id);
        if (empleado) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ message: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el empleado', error });
    }
};

exports.create = async (req, res) => {
    try {
        const empleado = await Empleado.create(req.body);
        res.status(201).json(empleado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el empleado', error });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Empleado.update(req.body, {
            where: { idEmpleado: req.params.id },
        });
        if (updated) {
            const updatedEmpleado = await Empleado.findByPk(req.params.id);
            res.status(200).json(updatedEmpleado);
        } else {
            res.status(404).json({ message: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el empleado', error });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Empleado.destroy({
            where: { idEmpleado: req.params.id },
        });
        if (deleted) {
            res.status(204).json({message: 'Empleado eliminado exitosamente'});
        } else {
            res.status(404).json({ message: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el empleado', error });
    }
};