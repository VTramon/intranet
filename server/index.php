<?php
require './connection.php';



switch ($_SERVER['PATH_INFO']) {
    case '/servico/all':
        echo json_encode(getAllRequisicao());
        break;

    case '/imagem':
        header('Content-Type:image/png');
        $id = $_GET['id'];
        echo base64_decode(getImageById($id)['Dadoimagem']);
        break;

    case '/servico':
        $data = [];
        if (isset($_GET['id'])) {
            $data = getRequisicaoById($_GET['id']);

            echo json_encode($data);
        }
        if (isset($_GET['img'])) {
            $data = getImageById($_GET['img']);

            echo json_encode($data);
        }
        break;


    default:
        // echo 'Status code: 400; ERROR MESSAGE: Bad request';
        http_response_code(400);
        break;
}
