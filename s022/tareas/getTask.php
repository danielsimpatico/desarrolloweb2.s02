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
$sql = "SELECT * FROM tareas WHERE id_tarea = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_tarea);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(['success' => false, 'message' => 'Tarea no encontrada']);
}
$stmt->close();
$conn->close();
?>
