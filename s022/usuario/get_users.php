<?php
header('Content-Type: application/json');

$mysqli = new mysqli("localhost", "root", "", "gestion_tareas");

if ($mysqli->connect_error) {
    die(json_encode(['error' => 'Error en la conexión: ' . $mysqli->connect_error]));
}

$sql = "SELECT id_usuario, nom_usuario, email, fecha_creacion FROM usuarios";
$result = $mysqli->query($sql);

$usuarios = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

echo json_encode($usuarios);
$mysqli->close();
?>
