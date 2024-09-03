// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Importar las rutas
const reportRoutes = require('./routes/reportRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000 // 50 segundos
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Servir los archivos estáticos de la raíz del proyecto
app.use(express.static(path.join(__dirname, '../')));

// Usar las rutas de reportes
app.use('/reportes', reportRoutes);

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
