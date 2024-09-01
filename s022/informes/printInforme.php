<?php
require('fpdf/fpdf.php');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestion_tareas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$id_informe = $_GET['id_informe'];

$sql = "SELECT i.id_informe, p.nom_proyecto, i.fch_informe, i.progreso
        FROM informes i
        JOIN proyectos p ON i.id_proyecto = p.id_proyecto
        WHERE i.id_informe = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_informe);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $informe = $result->fetch_assoc();

    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);

    $pdf->Cell(0, 10, 'Informe del Proyecto', 0, 1, 'C');
    $pdf->Ln(10);

    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(50, 10, 'ID Informe:', 0, 0);
    $pdf->Cell(0, 10, $informe['id_informe'], 0, 1);

    $pdf->Cell(50, 10, 'Nombre del Proyecto:', 0, 0);
    $pdf->Cell(0, 10, $informe['nom_proyecto'], 0, 1);

    $pdf->Cell(50, 10, 'Fecha del Informe:', 0, 0);
    $pdf->Cell(0, 10, $informe['fch_informe'], 0, 1);

    $pdf->Cell(50, 10, 'Progreso:', 0, 0);
    $pdf->Cell(0, 10, $informe['progreso'] . '%', 0, 1);

    $pdf->Output();
} else {
    echo "Informe no encontrado.";
}

$stmt->close();
$conn->close();
?>
