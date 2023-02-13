<?php

require '../connection.php';


header('Content-Type:image/png');

// $id = mb_split('id=', $_SERVER['REQUEST_URI'])[1];

$id = $_GET['id'];

// echo getImageById($id)['Dadoimagem'];
echo base64_decode(getImageById($id)['Dadoimagem']);
