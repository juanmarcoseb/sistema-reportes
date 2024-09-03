// backend/controllers/reportController.js

const Report = require('../models/Report'); // Importar el modelo de reporte

// Controlador para crear un nuevo reporte
const createReport = async (req, res) => {
    try {
        const newReport = new Report(req.body); // Crear un nuevo reporte con los datos recibidos
        await newReport.save(); // Guardar el reporte en la base de datos
        res.status(201).json(newReport); // Responder con el reporte creado
    } catch (error) {
        console.error('Error al crear el reporte:', error); // Añadir un log para ver el error
        res.status(500).json({ message: 'Error al crear el reporte', error });
    }
};

// Controlador para obtener todos los reportes
const getReports = async (req, res) => {
    try {
        const reports = await Report.find(); // Obtener todos los reportes de la base de datos
        res.status(200).json(reports); // Responder con la lista de reportes
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los reportes', error });
    }
};

// Controlador para obtener un reporte por su ID
const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id); // Buscar el reporte por ID
        if (!report) return res.status(404).json({ message: 'Reporte no encontrado' });
        res.status(200).json(report); // Responder con el reporte encontrado
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el reporte', error });
    }
};

// Controlador para actualizar un reporte por su ID
const updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReport) return res.status(404).json({ message: 'Reporte no encontrado' });
        res.status(200).json(updatedReport); // Responder con el reporte actualizado
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el reporte', error });
    }
};

// Controlador para eliminar un reporte por su ID
const deleteReport = async (req, res) => {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.id);
        if (!deletedReport) return res.status(404).json({ message: 'Reporte no encontrado' });
        res.status(200).json({ message: 'Reporte eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el reporte', error });
    }
};

// Exportar todos los controladores
module.exports = {
    createReport,
    getReports,
    getReportById,
    updateReport,
    deleteReport
};
