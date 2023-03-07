<?php

$env = parse_ini_file('../.env');


$file = fopen($env['responsaveis'], 'r');
// $file = fopen('C:\Users\vitor\OneDrive\Documents\responsaveis.csv', 'r');

$setor = $_GET['setor'];


$responsaveis = [];
$num = 1;


while (($data = fgetcsv($file, null, ';')) !== FALSE) {
    // echo json_encode(trim($data[0], "\xEF\xBB\xBF"));

    if (preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $data[0]) == $setor) {
        for ($i = 1; $i < count($data); $i++) {
            if ($data[$i] != '') {
                array_push($responsaveis, $data[$i]);
            }
        }
    }
}
fclose($file);

echo json_encode($responsaveis);
