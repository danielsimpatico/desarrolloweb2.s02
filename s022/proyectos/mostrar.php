<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestion_tareas";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Conexión fallida: ' . $conn->connect_error]));
}

// Consulta para obtener los datos de la tabla proyectos, incluyendo el nombre del usuario
$sql = "SELECT p.id_proyecto, p.nom_proyecto, p.desc_proyecto, p.fch_creacion_proy, 
p.fch_inicio_proy, p.fch_fin_proy, p.estado_proy, u.nombre AS nom_usuario 
        FROM proyectos p 
        JOIN usuarios u ON p.id_usuario = u.id_usuario";
$result = $conn->query($sql);

$proyectos = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $proyectos[] = $row;
    }
}

echo json_encode($proyectos);

$conn->close();
?>
