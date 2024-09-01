<?php
header('Content-Type: application/json');

// Obtener los datos enviados desde la solicitud AJAX
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'];
$password = $input['password'];

// Conectar a la base de datos (ajusta los valores de conexión según tu configuración)
$mysqli = new mysqli("localhost", "root", "", "gestion_tareas");

// Verificar la conexión a la base de datos
if ($mysqli->connect_error) {
    die("Error en la conexión: " . $mysqli->connect_error);
}

// Escapar valores para evitar inyecciones SQL
$email = $mysqli->real_escape_string($email);

// Consultar si el usuario existe en la tabla usuarios
$sql = "SELECT nombre, password FROM usuarios WHERE email = '$email'";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        echo json_encode(['success' => true, 'nombre' => $row['nombre']]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}

// Cerrar la conexión a la base de datos
$mysqli->close();
?>
