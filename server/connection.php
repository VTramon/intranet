<?php
$env = parse_ini_file('../.env');

$connection = [
    'Uid' => $env['user'],
    'PWD' => $env['password'],
    'Database' => $env['DB']
];

$connect = sqlsrv_connect($env['server'], $connection) or die(print_r(sqlsrv_errors(), true));

function queryData($text)
{
    $query = sqlsrv_query($GLOBALS['connect'], $text) or die(print_r(sqlsrv_errors(), true));
    return $query;
}



function getAllRequisicao()
{
    $query = sqlsrv_query($GLOBALS['connect'], "select * from Trequisicao where not Status='Concluido' order by Idrequisicao desc") or die(print_r(sqlsrv_errors(), true));
    $data = [];
    while ($row = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC)) {
        array_push($data, $row);
    }
    return $data;
}


function getRequisicaoById($id)
{
    $query = sqlsrv_query($GLOBALS['connect'], "select * from Trequisicao where Idrequisicao='$id'") or die(print_r(sqlsrv_errors(), true));
    return sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC);
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


function getAgrupamentoById($id)
{
    $query = sqlsrv_query($GLOBALS['connect'], "select * from Tagrupamento where Idagrupamento='$id'") or die(print_r(sqlsrv_errors(), true));
    // $data = [];
    // while ($row = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC)) {
    //     array_push($data, $row);
    // }
    return sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC);
}
