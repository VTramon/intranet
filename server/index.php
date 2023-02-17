<?php
require './connection.php';

$fullUsername = shell_exec("wmic computersystem get username");
$fullName = shell_exec("wmic computersystem get name");

$username = mb_split(' ', mb_split('\\\\', $fullUsername)[1])[0];
$name = mb_split(' ', mb_split('\n', $fullName)[1])[0];


function getRequisicaoService()
{
    $data = [];
    if (isset($_GET['id'])) {
        $data = getRequisicaoById($_GET['id']);

        echo json_encode($data);
    }
    if (isset($_GET['img'])) {
        $data = getImageById($_GET['img']);

        echo json_encode($data);
    }
}


function submitRequisicaoService()
{
    // if success redirect to last page
    function lastPage()
    {
        header('Location: /');
    }

    function handleImage($data, $now)
    {
        $type = $data['type'];
        $size = $data['size'];
        $tmpName = $data['tmp_name'];

        $fp = fopen($tmpName, 'rb') or die('Não foi possivel abrir o arquivo: ' . $tmpName);
        $imagem = fread($fp, $size) or die('Não foi possivel ler o arquivo: ' . $imagem);
        fclose($fp);

        $result = base64_encode($imagem);

        $id = uniqid() . $now;

        queryData("INSERT INTO Timagem(Idimagem, Dadoimagem) VALUES('$id', '$result');");

        return $id;
    }

    if ($_FILES['arquivo']['error'] === 0) {
        $setor = $_POST['input'];
        $texto = $_POST['texto'];
        $usuario = $GLOBALS['username'];
        $now = new DateTime();
        $idImagem = handleImage($_FILES['arquivo'], $now->format('d-m-Y'));
        if ($idImagem > 0 && $idImagem != false) {
            $insertRequisicao = queryData("INSERT INTO Trequisicao(
                Usuario, Textorequisicao, Createdat, Setor, Imagem, Status)
                VALUES ('$usuario', '$texto', '{$now->format('Y-d-m H:i:s')}', '$setor', '$idImagem', 'A revisar');");
        }
        lastPage();
    } else if ($_FILES['arquivo']['error'] === 4) {
        $setor = $_POST['input'];
        $texto = $_POST['texto'];
        $usuario = $GLOBALS['username'];
        $now = new DateTime();

        $insertRequisicao = queryData("INSERT INTO Trequisicao(
            Usuario, Textorequisicao, Createdat, Setor, Status)
            VALUES ('$usuario', '$texto', '{$now->format('Y-d-m H:i:s')}', '$setor', 'A revisar');");

        lastPage();
    } else if ($_FILES['arquivo']['error'] === 1 || $_FILES['arquivo']['error'] === 2) {
        echo 'O arquivo inserido excede o tamanho máximo de arquivo permitido';
    } else if ($_FILES['arquivo']['error'] === 3) {
        echo 'Ocorreu um erro durante o upload da imagem, por favor tente novamente.';
    } else {
        echo 'Ocorreu um erro durante o upload da imagem, por favor tente novamente.';
        var_dump($_FILES['arquivo']);
    }
}



function updateServico(){
    $agrupamento = $_POST['input'];
    $conclusao = $_POST['texto'];
    $idRequisicao = $_POST['id'];
    date_default_timezone_set('America/Sao_Paulo');

    $now = new Datetime();
    $idAgrupamento = uniqid() . $now->format('d-m-Y');

    $qiery1 = queryData("INSERT INTO Tagrupamento(Idagrupamento, Tipoagrupamento) values('$idAgrupamento', '$agrupamento')");
    $qiery2 = queryData("UPDATE Trequisicao SET Textoconclusao='$conclusao', Agrupamento='$idAgrupamento', Status='Revisado', Updatedat='{$now->format('Y-d-m H:i:s')}' WHERE Idrequisicao='$idRequisicao'");


    if($qiery1 != null && $qiery2 != null){
        header("Location: /servico/index.php?id=$idRequisicao");
    }
}







// echo json_encode($_SERVER);
///////////////////////////// Controller /////////////////////////////
switch ($_SERVER['PATH_INFO']) {
    case '/servico/all':
        echo json_encode(getAllRequisicao());
        break;

    case '/imagem':
        header('Content-Type:image/png');
        $id = $_GET['id'];
        echo base64_decode(getImageById($id)['Dadoimagem']);
        break;

    case '/servico/conclude':
        $id = $_POST['id'];
        $now = new DateTime();
        $query = queryData("UPDATE Trequisicao SET Completedat='{$now->format('Y-d-m H:i:s')}', Status='Concluido' WHERE Idrequisicao='$id'");
        if ($query != false) {
            header("Location: /servico/index.php?id=$id");
        }
        break;

    case '/servico':
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            getRequisicaoService();
        } else {
            submitRequisicaoService();
        }
        break;
        
    case '/servico/update':
        updateServico();
        break;

    case '/agrupamento':
        echo json_encode(getAgrupamentoById($_GET['id']));
        break;


    default:
        // echo 'Status code: 400; ERROR MESSAGE: Bad request';
        http_response_code(400);
        break;
}
