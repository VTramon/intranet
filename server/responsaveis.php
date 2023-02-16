<?php



$file = fopen('C:\Users\vitor.lemos\Documents\responsaveis.csv', 'r');

$setor = $_GET['setor'];


$responsaveis = [];
$num = 1;


while (($data = fgetcsv($file, null, ';')) !== FALSE) {
    if ($data[0] == $setor) {
        for ($i = 1; $i < count($data); $i++) {
            if ($data[$i] != '') {
                array_push($responsaveis, $data[$i]);
            }
        }
    }
}
fclose($file);

echo json_encode($responsaveis);
