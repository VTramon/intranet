<?php

require '../connection.php';



// if ($_GET) {
$data = getAllRequisicao();

echo json_encode($data);
// }
