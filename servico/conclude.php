<?php
require '../connection.php';


$id = $_POST['id'];

$now = new DateTime();

$query = queryData("UPDATE Trequisicao SET Completedat='{$now->format('Y-d-m H:i:s')}', Status='Concluido' WHERE Idrequisicao='$id'");


if($query != false){
    header("Location: /servico/index.php?id=$id");
}