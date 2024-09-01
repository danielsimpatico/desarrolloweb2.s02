<?php
header('Content-Type: application/json');

$mysqli = new mysqli("localhost", "root", "", "gestion_tareas");

if ($mysqli->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Error en la conexión: ' . $mysqli->connect_error]));
}

$id_usuario = intval($_GET['id_usuario']);
$sql = "DELETE FROM usuarios WHERE id_usuario = $id_usuario";

if ($mysqli->query($sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar el usuario']);
}

$mysqli->close();
?>
