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
$id_tarea = $_GET['id_tarea'];
$sql = "DELETE FROM tareas WHERE id_tarea = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_tarea);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar la tarea']);
}
$stmt->close();
$conn->close();
?>

