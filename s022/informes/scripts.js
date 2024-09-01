document.addEventListener('DOMContentLoaded', function () {
    fetchInformes();
});

function fetchInformes() {
    // Aquí deberías realizar una solicitud AJAX para obtener los datos desde el servidor
    // y mostrarlos en el div con id="informe-list".

    // Por ejemplo, simularemos una llamada con datos dummy:
    const informes = [
        {
            id_informe: 1,
            id_proyecto: 1,
            fch_informe: "2024-09-01",
            progreso: "75%",
            comentarios: [
                { id_comentario: 1, comentario: "Comentario 1", fch_comentario: "2024-08-30" }
            ],
            tareas: [
                { id_tarea: 1, nom_tarea: "Tarea 1", estado_tarea: "En progreso" }
            ],
            asignaciones: [
                { id_asignacion: 1, id_usuario: 1, fch_asignacion: "2024-08-15" }
            ]
        }
        // Agrega más informes según sea necesario
    ];

    let output = '<table border="1"><tr><th>ID Informe</th><th>Proyecto</th><th>Fecha Informe</th><th>Progreso</th><th>Comentarios</th><th>Tareas</th><th>Asignaciones</th></tr>';
    informes.forEach(informe => {
        output += `<tr>
            <td>${informe.id_informe}</td>
            <td>${informe.id_proyecto}</td>
            <td>${informe.fch_informe}</td>
            <td>${informe.progreso}</td>
            <td>${informe.comentarios.map(c => c.comentario).join(", ")}</td>
            <td>${informe.tareas.map(t => t.nom_tarea).join(", ")}</td>
            <td>${informe.asignaciones.map(a => a.id_usuario).join(", ")}</td>
        </tr>`;
    });
    output += '</table>';
    document.getElementById('informe-list').innerHTML = output;
}

function imprimirInforme() {
    window.print(); // Esto abre el diálogo de impresión para la página
}
