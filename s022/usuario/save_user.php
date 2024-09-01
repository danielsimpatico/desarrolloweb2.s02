<?php
header('Content-Type: application/json');

$mysqli = new mysqli("localhost", "root", "", "gestion_tareas");

if ($mysqli->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Error en la conexión: ' . $mysqli->connect_error]));
}

$id_usuario = isset($_POST['id_usuario']) ? intval($_POST['id_usuario']) : 0;
$nom_usuario = $mysqli->real_escape_string($_POST['nom_usuario']);
$email = $mysqli->real_escape_string($_POST['email']);
$pass = password_hash($mysqli->real_escape_string($_POST['pass']), PASSWORD_DEFAULT);

if ($id_usuario > 0) {
    // Actualizar el usuario existente
    $sql = "UPDATE usuarios SET nom_usuario='$nom_usuario', email='$email', pass='$pass' WHERE id_usuario=$id_usuario";
} else {
    // Insertar un nuevo usuario
    $sql = "INSERT INTO usuarios (nom_usuario, email, pass, fecha_creacion) VALUES ('$nom_usuario', '$email', '$pass', NOW())";
}

if ($mysqli->query($sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar el usuario']);
}

$mysqli->close();
?>
