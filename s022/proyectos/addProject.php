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

$nom_proyecto = $data['nom_proyecto'];
$desc_proyecto = $data['desc_proyecto'];
$fch_inicio_proy = $data['fch_inicio_proy'];
$fch_fin_proy = $data['fch_fin_proy'];
$estado_proy = $data['estado_proy'];
$id_usuario = $data['id_usuario'];

$sql = "INSERT INTO proyectos (nom_proyecto, desc_proyecto, fch_inicio_proy, fch_fin_proy, 
estado_proy, id_usuario) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $nom_proyecto, $desc_proyecto, $fch_inicio_proy, $fch_fin_proy, 
$estado_proy, $id_usuario);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al agregar el proyecto']);
}

$stmt->close();
$conn->close();
?>
