<?php
require '../connection.php';

// echo json_encode($_POST);

$agrupamento = $_POST['input'];
$conclusao = $_POST['texto'];
$idRequisicao = $_POST['id'];
date_default_timezone_set('America/Sao_Paulo');

$now = new Datetime();
$idAgrupamento = uniqid() . $now->format('d-m-Y');

$qiery1 = queryData("INSERT INTO Tagrupamento(Idagrupamento, Tipoagrupamento) values('$idAgrupamento', '$agrupamento')");
$qiery2 = queryData("UPDATE Trequisicao SET Textoconclusao='$conclusao', Agrupamento='$idAgrupamento', Status='Revisado', Updatedat='{$now->format('Y-m-d H:i:s')}' WHERE Idrequisicao='$idRequisicao'");


if($qiery1 != null && $qiery2 != null){
    header("Location: /servico/index.php?id=$idRequisicao");
}