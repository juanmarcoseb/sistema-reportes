const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    fecha: { type: String, required: true },
    horaInicio: { type: String, required: true },
    horaFin: { type: String, required: true },
    cantidadProfecias: { type: Number, required: true },
    predicador: { type: String, required: true },
    tema: { type: String, required: true },
    asistencia: { type: Number, required: true },
    fluyo: { type: Boolean, required: true },
    huboLiberacion: { type: Boolean, required: true },
    huboConvertidos: { type: Number, required: true },
    fueraDeLoNormal: { type: String }
});

module.exports = mongoose.model('Report', reportSchema);
