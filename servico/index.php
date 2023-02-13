<?php

// require '../connection.php';
// require './script.php';
error_reporting(E_ERROR | E_PARSE);


$idRequisicao = mb_split('id=', $_SERVER['REQUEST_URI'])[1] or header('location:/classificacao/index.php');
// $editable = mb_split('editable=', $_SERVER['REQUEST_URI'])[1];
$editable = 'false';

$fullUsername = shell_exec("wmic computersystem get username");
// $test = mb_split('\\\\', $fullUsername);
$username = mb_split(' ', mb_split('\\\\', $fullUsername)[1])[0];
$usernameRegex = preg_match('(vitor\\.lemos|fasmj|francisco\\.junior|luccas\\.moragas|rafael\\.moraes)', $username);


if ($usernameRegex) {
  $editable = 'true';
}

// $data = getRequisicaoById($idRequisicao)[0];

// echo json_encode($data);

// date_timezone_set($data['Createdat'], timezone_open('America/Sao_Paulo'));

// $date = $data['Createdat']->format('d/m/Y H:i:s');
// date_default_timezone_set('America/Sao_Paulo');


// echo json_encode($data['Createdat']);
// echo json_encode(new Datetime());

// echo json_encode($data['Imagem']);
// echo json_encode(getImageById($data['Imagem']));

?>



<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Serviço</title>
</head>

<body>
  <header>
    <img src="../public/images/tecal.png" alt="">
    <form id='conclude_form' action="./conclude.php" method="post">
      <?php
      if ($usernameRegex && ($data['Status'] == 'A revisar' || $data['Status'] == 'Revisado')) {
        $html = new DOMDocument();
        $html->loadHTML("<input id='conclude_hidden_id_input' type='hidden' name='id' value='$idRequisicao'>");
        echo $html->saveHTML();
      }
      ?>
    </form>
  </header>

  <main>
    <section>

      <div id="image_container">
        <?php
        // if ($data['Imagem']) {

        //   echo imgTemplate('/image/index.php?id=' . $data['Imagem']);
        // }
        ?>

        <!-- <a id="prev" class="prev" onclick="plusSlides(1)">&#10094;</a>
        <a class="next" onclick="plusSlides(-1)">&#10095;</a> -->
      </div>

      <div class="service_details">
        <div class="data_container usuario_container">
          <p class="usuario_label">Usuário:</p>
          <p id="usuario"></p>
        </div>

        <div class="data_container setor_container">
          <p class="setor_label">Setor:</p>
          <p id="setor"></p>
        </div>

        <div class="data_container created_container">
          <p class="data_label">Criado:</p>
          <p id="criado"></p>
        </div>

        <?php
        // if ($data['Updatedat'] != null) {
        //   $html = new DOMDocument();
        //   $html->loadHTML("
        //     <div class='data_container updated_container'>
        //     <p class='data_label'>Atualizado:</p>
        //     <p class='data'> {$data['Updatedat']->format('d/m/Y H:i:s')} </p>
        //     </div>");
        //   echo $html->saveHTML();
        // }

        // if ($data['Completedat'] != null) {
        //   $html = new DOMDocument();
        //   $html->loadHTML("
        //     <div class='data_container updated_container'>
        //     <p class='data_label'>Concluido:</p>
        //     <p class='data'> {$data['Completedat']->format('d/m/Y H:i:s')} </p>
        //     </div>");
        //   echo $html->saveHTML();
        // }
        ?>

        <div class="data_container texto_container">
          <p class="texto_label">Texto:</p>
          <p id="texto_requisicao"></p>
        </div>

      </div>

      <form id='update_form' action='./submit.php' method='post'>
        <?php
        // if ($data['Agrupamento'] == null && $editable == 'true') {
        //   echo formTemplate($idRequisicao, true);
        // }
        // if ($data['Agrupamento'] == null && $editable == 'false') {
        //   // Retorna nada
        // }
        // if ($data['Agrupamento'] != null && $editable == 'true') {
        //   $agrupamento = getAgrupamentoById($data['Agrupamento'])['Tipoagrupamento'];

        //   echo formTemplate($idRequisicao, false, $agrupamento, $data['Textoconclusao'], $editable);
        // }
        // if ($data['Agrupamento'] != null && $editable == 'false') {
        //   $agrupamento = getAgrupamentoById($data['Agrupamento'])['Tipoagrupamento'];

        //   echo formTemplate($idRequisicao, false, $agrupamento, $data['Textoconclusao']);
        // }
        ?>
      </form>
    </section>
  </main>

  <footer></footer>

  <script type="module" src="./script.js"></script>

</body>

</html>