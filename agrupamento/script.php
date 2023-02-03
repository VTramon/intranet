<?php

$server = '192.168.7.7';
$user = 'INTRA';
$password = 'estrela77';
$DB = 'INTRANET';

$connection = [
    'Uid' => "$user",
    'PWD' => "$password",
    'Database' => "$DB"
];

// try {
//     $servidor = "vm-dba";
//     $instancia = "sql2016";
//     // $porta = 1433;
//     $database = "INTRANET";
//     $usuario = "INTRA";
//     $senha = "estrela77";

//     $conexao = new PDO("sqlsrv:Server={$servidor}\\{$instancia};Database={$database}", $usuario, $senha);
//     // $conexao = new PDO("sqlsrv:Server={$servidor}\\{$instancia},{$porta};Database={$database}", $usuario, $senha);
// } catch (PDOException $e) {
//     echo "Drivers disponiveis: " . implode(",", PDO::getAvailableDrivers());
//     echo "\nErro: " . $e->getMessage();
//     exit;
// }

// $query = $conexao->prepare("select @@version");
// $query->execute();

// $resultado = $query->fetchAll();

// echo $resultado['0']['0'];

// unset($conexao);
// unset($query);

// var_dump($connection);
$conn = sqlsrv_connect($server, $connection);

// echo json_encode(sqlsrv_server_info($conn));

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
} else {


    // sqlsrv_query($conn, "insert into Tagrupamento(Tipoagrupamento) values('Hardware')");



    $query = sqlsrv_query($conn, "select * from Timagem");
    $data = [];
    while ($row = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC)) {
        array_push($data, $row);
    }

    echo json_encode($data);
}

// db: INTRANET
// tables: Tagrupamento
// column: Idagrupamento; Tipoagrupamento
