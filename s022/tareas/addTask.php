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

$data = json_decode(file_get_contents("php://input"), true);

$nom_tarea = $data['nom_tarea'];
$desc_tarea = $data['desc_tarea'];
$fch_creacion_tarea = $data['fch_creacion_tarea'];
$fch_inicio_tarea = $data['fch_inicio_tarea'];
$fch_final_tarea = $data['fch_final_tarea'];
$prioridad_tarea = $data['prioridad_tarea'];
$estado_tarea = $data['estado_tarea'];
$id_proyecto = $data['id_proyecto'];

$sql = "INSERT INTO tareas (nom_tarea, desc_tarea, fch_creacion_tarea, fch_inicio_tarea,
 fch_final_tarea, prioridad_tarea, estado_tarea, id_proyecto) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssi", $nom_tarea, $desc_tarea, $fch_creacion_tarea, $fch_inicio_tarea, 
$fch_final_tarea, $prioridad_tarea, $estado_tarea, $id_proyecto);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al agregar la tarea']);
}

$stmt->close();
$conn->close();
?>