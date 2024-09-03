document.addEventListener('DOMContentLoaded', () => {
    const crearReporteBtn = document.getElementById('crearReporte');
    const verHistorialBtn = document.getElementById('verHistorial');
    const menuPrincipal = document.getElementById('menuPrincipal');
    const formularioReporte = document.getElementById('formularioReporte');
    const historialReportes = document.getElementById('historialReportes');
    const volverMenuBtn = document.getElementById('volverMenu');
    const volverMenuHistorialBtn = document.getElementById('volverMenuHistorial');
    const reporteForm = document.getElementById('reporteForm');
    const guardarBtn = document.getElementById('guardarReporte');

    crearReporteBtn.addEventListener('click', () => {
        menuPrincipal.style.display = 'none';
        formularioReporte.style.display = 'block';
        historialReportes.style.display = 'none';
        reporteForm.reset();
    });

    verHistorialBtn.addEventListener('click', () => {
        menuPrincipal.style.display = 'none';
        formularioReporte.style.display = 'none';
        historialReportes.style.display = 'block';
        obtenerReportes();
    });

    volverMenuBtn.addEventListener('click', () => {
        formularioReporte.style.display = 'none';
        menuPrincipal.style.display = 'block';
    });

    volverMenuHistorialBtn.addEventListener('click', () => {
        historialReportes.style.display = 'none';
        menuPrincipal.style.display = 'block';
    });

    guardarBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const formData = new FormData(reporteForm);
        const data = Object.fromEntries(formData.entries());
        data.fluyo = data.fluyo === 'true';
        data.huboLiberacion = data.huboLiberacion === 'true';
        crearReporte(data);
    });

    window.eliminarReporte = function(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
            fetch(`http://localhost:3000/reportes/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert('Reporte eliminado con éxito!');
                obtenerReportes();
            })
            .catch(error => {
                console.error('Error al eliminar el reporte:', error);
            });
        }
    };

    window.generarPDF = function(reporte) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text('Reporte de Iglesia', 10, 10);
        doc.text(`Fecha: ${reporte.fecha}`, 10, 20);
        doc.text(`Hora de Inicio: ${reporte.horaInicio}`, 10, 30);
        doc.text(`Hora de Finalización: ${reporte.horaFin}`, 10, 40);
        doc.text(`Cantidad de Profecías: ${reporte.cantidadProfecias}`, 10, 50);
        doc.text(`Predicador: ${reporte.predicador}`, 10, 60);
        doc.text(`Tema: ${reporte.tema}`, 10, 70);
        doc.text(`Asistencia: ${reporte.asistencia}`, 10, 80);
        doc.text(`Fluyó: ${reporte.fluyo ? 'Sí' : 'No'}`, 10, 90);
        doc.text(`Hubo Liberación: ${reporte.huboLiberacion ? 'Sí' : 'No'}`, 10, 100);
        doc.text(`Número de Convertidos: ${reporte.huboConvertidos}`, 10, 110);
        doc.text(`Pasó algo fuera de lo normal: ${reporte.fueraDeLoNormal}`, 10, 120);
        doc.save('reporte.pdf');
    };

    function crearReporte(data) {
        fetch('http://localhost:3000/reportes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('Reporte creado exitosamente');
            reporteForm.reset();
            menuPrincipal.style.display = 'block';
            formularioReporte.style.display = 'none';
        })
        .catch(error => console.error('Error al crear el reporte:', error));
    }

    function obtenerReportes() {
        fetch('http://localhost:3000/reportes')
        .then(response => response.json())
        .then(reportes => {
            const reportesBody = document.getElementById('reportesBody');
            reportesBody.innerHTML = '';
            reportes.forEach(reporte => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
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
                    <td>
                        <button class="btn btn-danger" onclick="eliminarReporte('${reporte._id}')">Eliminar</button>
                        <button class="btn btn-info" onclick="generarPDF(${JSON.stringify(reporte).replace(/"/g, '&quot;')})">Generar PDF</button>
                    </td>
                `;
                reportesBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error al obtener los reportes:', error));
    }
});
