// backend/routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController'); // Importar los controladores

// Definir las rutas y asociarlas con los controladores
router.post('/', reportController.createReport); // Ruta para crear un nuevo reporte
router.get('/', reportController.getReports); // Ruta para obtener todos los reportes
router.get('/:id', reportController.getReportById); // Ruta para obtener un reporte por ID
router.put('/:id', reportController.updateReport); // Ruta para actualizar un reporte por ID
router.delete('/:id', reportController.deleteReport); // Ruta para eliminar un reporte por ID

module.exports = router; // Exportar las rutas
