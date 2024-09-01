<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestion_tareas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Conexión fallida: ' . $conn->connect_error]));
}

$id_proyecto = $_GET['id_proyecto'];

$sql = "DELETE FROM proyectos WHERE id_proyecto = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_proyecto);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar el proyecto']);
}

$stmt->close();
$conn->close();
?>