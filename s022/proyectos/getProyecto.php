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

$sql = "SELECT * FROM proyectos WHERE id_proyecto = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_proyecto);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(['success' => false, 'message' => 'Proyecto no encontrado']);
}

$stmt->close();
$conn->close();
?>
