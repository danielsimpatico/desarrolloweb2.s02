<?php
header('Content-Type: application/json');

$mysqli = new mysqli("localhost", "root", "", "gestion_tareas");

if ($mysqli->connect_error) {
    die(json_encode(['error' => 'Error en la conexión: ' . $mysqli->connect_error]));
}

$id_usuario = intval($_GET['id_usuario']);
$sql = "SELECT id_usuario, nombre, email, password FROM usuarios WHERE id_usuario = $id_usuario";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user);
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$mysqli->close();
?>