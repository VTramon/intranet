<?php
require '../connection.php';

// echo json_encode($_POST);

$agrupamento = $_POST['input'];
$conclusao = $_POST['texto'];
$idRequisicao = $_POST['id'];
date_default_timezone_set('America/Sao_Paulo');

$now = new Datetime();
$idAgrupamento = uniqid() . $now->format('d-m-Y');

queryData("INSERT INTO Tagrupamento(Idagrupamento, Tipoagrupamento) values('$idAgrupamento', '$agrupamento')");
queryData("UPDATE Trequisicao SET Textoconclusao='$conclusao', Agrupamento='$idAgrupamento' WHERE Idrequisicao='$idRequisicao'");
