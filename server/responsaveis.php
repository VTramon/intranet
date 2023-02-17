<?php



// $file = fopen('C:\Users\vitor.lemos\Documents\responsaveis.csv', 'r');
$file = fopen('C:\Users\vitor\OneDrive\Documents\responsaveis.csv', 'r');

$setor = $_GET['setor'];


$responsaveis = [];
$num = 1;


while (($data = fgetcsv($file, null, ';')) !== FALSE) {
    // echo json_encode(trim($data[0], "\xEF\xBB\xBF"));
    
    if (trim($data[0], "\xEF\xBB\xBF") == $setor) {
        for ($i = 1; $i < count($data); $i++) {
            if ($data[$i] != '') {
                array_push($responsaveis, $data[$i]);
            }
        }
    }
}
fclose($file);

echo json_encode($responsaveis);
