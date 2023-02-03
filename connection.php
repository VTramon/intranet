<?php

// $server = '192.168.7.7';
$server = 'DESKTOP-DQHQ8D4';
$user = 'INTRA';
$password = 'estrela77';
$DB = 'INTRANET';

$connection = [
    'Uid' => "$user",
    'PWD' => "$password",
    'Database' => "$DB"
];


$connect = sqlsrv_connect($server, $connection) or die(print_r(sqlsrv_errors(), true));

function queryData($text)
{
    $query = sqlsrv_query($GLOBALS['connect'], $text) or die(print_r(sqlsrv_errors(), true));
    return $query;
}



function getAllRequisicao()
{
    $query = sqlsrv_query($GLOBALS['connect'], "select * from Trequisicao") or die(print_r(sqlsrv_errors(), true));
    $data = [];
    while ($row = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC)) {
        array_push($data, $row);
    }
    return $data;
}


function getRequisicaoById($id)
{
    $query = sqlsrv_query($GLOBALS['connect'], "select * from Trequisicao where Idrequisicao='$id'") or die(print_r(sqlsrv_errors(), true));
    $data = [];
    while ($row = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC)) {
        array_push($data, $row);
    }
    return $data;
}


function getImageById($id)
{
    $query = sqlsrv_query($GLOBALS['connect'], "select * from Timagem where Idimagem='$id'") or die(print_r(sqlsrv_errors(), true));
    // $data = [];
    // while ($row = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC)) {
    //     array_push($data, $row);
    // }
    return sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC);
}
