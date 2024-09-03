// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Importar las rutas
const reportRoutes = require('./routes/reportRoutes');

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

// Conectar a MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true, // Añadido para compatibilidad con versiones más nuevas de MongoDB
    useUnifiedTopology: true, // Añadido para manejar la topología de conexiones de manera óptima
    serverSelectionTimeoutMS: 50000 // 50 segundos
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Usar las rutas de reportes
app.use('/reportes', reportRoutes);

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido al sistema de reportes');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
