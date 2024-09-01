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
$sql = "SELECT id_proyecto, nom_proyecto FROM proyectos";
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
