<?php
require './connection.php';

$fullUsername = shell_exec("wmic computersystem get username");
$fullName = shell_exec("wmic computersystem get name");

$username = mb_split(' ', mb_split('\\\\', $fullUsername)[1])[0];
$name = mb_split(' ', mb_split('\n', $fullName)[1])[0];

// echo json_encode(array(
//     'username' => $username,
//     'name' => $name
// ));

// $createRequisicao = 'DROP TABLE requisicao CASCADE';
// $createClassificacao = 'DROP TABLE classificacao CASCADE';

// $createRequisicao = 'CREATE TABLE IF NOT EXISTS requisicao(id character varying, usuario character varying, texto character varying, createdAt timestamp without time zone, updatedAt timestamp without time zone, completedAt timestamp without time zone, setor character varying, imagem bytea, classificacao character varying, PRIMARY KEY (id))';
// $createRequisicao = 'CREATE TABLE IF NOT EXISTS requisicao(id character varying NOT NULL, usuario character varying NOT NULL, texto character varying NOT NULL, createdAt timestamp without time zone NOT NULL, updatedAt timestamp without time zone, completedAt timestamp without time zone, setor character varying NOT NULL, imagem bytea, classificacao character varying, PRIMARY KEY (id))';
// $createClassificacao = 'CREATE TABLE IF NOT EXISTS classificacao(id character varying NOT NULL, resolucao character varying NOT NULL, created_at timestamp without time zone NOT NULL, updated_at timestamp without time zone, PRIMARY KEY (id))';

// $addConstraints = 'ALTER TABLE IF EXISTS public.requisicao
// ADD CONSTRAINT classificacao FOREIGN KEY (classificacao)
// REFERENCES public.classificacao (id) MATCH SIMPLE
// ON UPDATE NO ACTION
// ON DELETE CASCADE
// NOT VALID;';

// $classificacao = query($createClassificacao);
// $requisicao = query($createRequisicao);
// $constraints = query($addConstraints);


// if (!$requisicao || !$classificacao) {
//     echo 'Ocorreu um erro durante a craiação das tabelas';
// }

// if(!$constraints){
//     echo 'Ocorreu um erro durante a craiação das constraints';
// }

// echo json_encode($_FILES['arquivo']);

// if(true){
//     echo json_encode(array(
//         'setor'=>$_POST['input'],
//         'texto'=>$_POST['texto'],
//         'file'=>$_FILES['arquivo'],
//     ));
// }else{
//     echo 'lhwjbef';
// }

if ($_FILES['arquivo']['error'] === 0) {
    // echo 'açrjgadgbçajrdgçkj';

    $setor = $_POST['input'];
    $texto = $_POST['texto'];
    $usuario = $GLOBALS['username'];
    // $usuario = 'vitor.lemos';
    $now = new DateTime();
    $idImagem = handleImage($_FILES['arquivo'], $now->format('d-m-Y/H:i:s'));
    // echo $now->format('Y-m-d H:i:s');
    if ($idImagem > 0 && $idImagem != false) {
        $insertRequisicao = queryData("INSERT INTO Trequisicao(
            Usuario, Textorequisicao, Createdat, Setor, Imagem, Status)
            VALUES ('$usuario', '$texto', '{$now->format('Y-d-m H:i:s')}', '$setor', '$idImagem', 'A revisar');");
    }
}

if ($_FILES['arquivo']['error'] === 4) {
    $setor = $_POST['setor'];
    $texto = $_POST['texto'];
    $usuario = $GLOBALS['username'];
    // $usuario = 'vitor.lemos';
    $now = new DateTime();


    $insertRequisicao = queryData("INSERT INTO Trequisicao(
        Usuario, Textorequisicao, Createdat, Setor, Status)
        VALUES ('$usuario', '$texto', '{$now->format('Y-d-m H:i:s')}', '$setor', 'A revisar');");
}

// if success redirect to last page
function lastPage($url)
{
    header('Location: ' . $url);
}

// lastPage("http://localhost:8080");
// data:image/png;base64,base64_encode()

function handleImage($data, $now)
{
    // $nome = $data['name'];
    $type = $data['type'];
    $size = $data['size'];
    $tmpName = $data['tmp_name'];

    $fp = fopen($tmpName, 'rb') or die('Não foi possivel abrir o arquivo: ' . $tmpName);
    $imagem = fread($fp, $size) or die('Não foi possivel ler o arquivo: ' . $imagem);
    fclose($fp);

    // $result = '0x' . escapeBytea($imagem);

    // $result = bin2hex($imagem);
    $result = base64_encode($imagem);
    // var_dump($result);
    // varbinary

    $id = uniqid() . $now;

    // $insertImagem = queryData("INSERT INTO imagem(id, nome, type, imagem) VALUES('" . $id . "', '$nome', '$type', '$result');");
    // echo 'açrjgadgbçajrdgçkj';


    queryData("INSERT INTO Timagem(Idimagem, Dadoimagem) VALUES('$id', '$result');");


    // header('Content-Type:image/png');
    // echo base64_decode($result);


    // $image;

    // data::$type;base64,
    // var_dump($insertImagem);

    // $imagemId = queryData('SELECT Idimagem FROM Timagem WHERE Idimagem = (SELECT MAX(Idimagem) FROM Timagem)');
    // $imagemId = queryData('SELECT * FROM Timagem');
    // var_dump($imagemId);
    // print_r(sqlsrv_fetch_array($imagemId, 2));

    // return $id;
    return $id;
}
