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
$sql = "SELECT i.id_informe, p.nom_proyecto, i.fch_informe, i.progreso
        FROM informes i
        JOIN proyectos p ON i.id_proyecto = p.id_proyecto";
$result = $conn->query($sql);
$informes = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $informes[] = $row;
    }
}
echo json_encode($informes);
$conn->close();
?>
