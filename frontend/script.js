document.addEventListener('DOMContentLoaded', () => {
    const crearReporteBtn = document.getElementById('crearReporte');
    const verHistorialBtn = document.getElementById('verHistorial');
    const formularioReporte = document.getElementById('formularioReporte');
    const historialReportes = document.getElementById('historialReportes');
    const volverMenuBtn = document.getElementById('volverMenu');
    const volverMenuHistorialBtn = document.getElementById('volverMenuHistorial');

    // Mostrar el formulario de creación de reporte
    crearReporteBtn.addEventListener('click', () => {
        formularioReporte.style.display = 'block';
        historialReportes.style.display = 'none';
    });

    // Mostrar el historial de reportes
    verHistorialBtn.addEventListener('click', () => {
        formularioReporte.style.display = 'none';
        historialReportes.style.display = 'block';
        obtenerReportes(); // Llamar a la API para obtener reportes
    });

    // Volver al menú principal
    volverMenuBtn.addEventListener('click', () => {
        formularioReporte.style.display = 'none';
    });

    volverMenuHistorialBtn.addEventListener('click', () => {
        historialReportes.style.display = 'none';
    });

    // Función para enviar un nuevo reporte al servidor
    const enviarReporte = (data) => {
        fetch('http://localhost:3000/reportes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('Reporte creado con éxito!');
        })
        .catch(error => {
            console.error('Error al crear el reporte:', error);
        });
    };

    // Función para obtener todos los reportes
    const obtenerReportes = () => {
        fetch('http://localhost:3000/reportes')
        .then(response => response.json())
        .then(reportes => {
            const tablaReportes = document.querySelector('#historialReportes table');
            tablaReportes.innerHTML = ''; // Limpiar tabla antes de añadir
            reportes.forEach(reporte => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${reporte.fecha}</td>
                    <td>${reporte.horaInicio}</td>
                    <td>${reporte.horaFin}</td>
                    <td>${reporte.cantidadProfecias}</td>
                    <td>${reporte.predicador}</td>
                    <td>${reporte.tema}</td>
                    <td>${reporte.asistencia}</td>
                    <td>${reporte.fluyo ? 'Sí' : 'No'}</td>
                    <td>${reporte.huboLiberacion ? 'Sí' : 'No'}</td>
                    <td>${reporte.huboConvertidos}</td>
                    <td>${reporte.fueraDeLoNormal}</td>
                `;
                tablaReportes.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener los reportes:', error);
        });
    };

    // Agregar evento al formulario
    const reporteForm = document.getElementById('reporteForm');
    reporteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(reporteForm);
        const data = Object.fromEntries(formData.entries());
        data.fluyo = data.fluyo === 'true'; // Convertir a booleano
        data.huboLiberacion = data.huboLiberacion === 'true'; // Convertir a booleano
        enviarReporte(data);
    });
});
