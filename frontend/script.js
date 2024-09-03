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

        // Calcula la posición centrada del título
        const titulo = 'Reporte de Iglesia:';
        const pageWidth = doc.internal.pageSize.getWidth();
        const tituloWidth = doc.getStringUnitWidth(titulo) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const xCenter = (pageWidth - tituloWidth) / 2;

        // Añade el título centrado
        doc.text(titulo, xCenter, 10);

        // Datos de la tabla
        const tableData = [
            ['Fecha', reporte.fecha],
            ['Hora de Inicio', reporte.horaInicio],
            ['Hora de Finalización', reporte.horaFin],
            ['Cantidad de Profecías', reporte.cantidadProfecias],
            ['Predicador', reporte.predicador],
            ['Tema', reporte.tema],
            ['Asistencia', reporte.asistencia],
            ['Fluyó', reporte.fluyo ? 'Sí' : 'No'],
            ['Hubo Liberación', reporte.huboLiberacion ? 'Sí' : 'No'],
            ['Número de Convertidos', reporte.huboConvertidos],
            ['Pasó algo fuera de lo normal', reporte.fueraDeLoNormal]
        ];

        // Genera la tabla con los datos
        doc.autoTable({
            head: [['', '']],
            body: tableData,
            startY: 20,
            theme: 'grid' // Agrega bordes a la tabla
        });

        // Formatea la fecha para el nombre del archivo
        const fechaFormateada = reporte.fecha.replace(/\//g, '-'); // Reemplaza '/' con '-' para un nombre de archivo válido
        const nombreArchivo = `reporte-${fechaFormateada}.pdf`;

        doc.save(nombreArchivo);
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
