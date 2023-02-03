<?php

require '../connection.php';
require './script.php';
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

$data = getRequisicaoById($idRequisicao)[0];



date_timezone_set($data['Createdat'], timezone_open('America/Sao_Paulo'));

$date = $data['Createdat']->format('d/m/Y H:i:s');
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
  <header></header>

  <main>
    <section>

      <div class="image_container">
        <?php
        echo imgTemplate('/servicos/image/index.php?id=' . $data['Imagem']);
        ?>

        <!-- <a id="prev" class="prev" onclick="plusSlides(1)">&#10094;</a>
        <a class="next" onclick="plusSlides(-1)">&#10095;</a> -->
      </div>

      <div class="service_details">
        <div class="data_container usuario_container">
          <p class="usuario_label">Usuário:</p>
          <p class="usuario"><?php echo $data['Usuario'] ?></p>
        </div>

        <div class="data_container setor_container">
          <p class="setor_label">Setor:</p>
          <p class="setor"><?php echo $data['Setor'] ?></p>
        </div>

        <div class="data_container texto_container">
          <p class="texto_label">Texto:</p>
          <p class="texto"><?php echo $data['Textorequisicao'] ?></p>
        </div>

        <div class="data_container data_container">
          <p class="data_label">Criado:</p>
          <p class="data"><?php echo $date ?></p>
        </div>
      </div>

      <?php
      if ($data['Agrupamento'] == null && $editable == 'true') {
        echo formTemplate($idRequisicao, true);
      }
      if ($data['Agrupamento'] == null && $editable == 'false') {
        // echo formTemplate($idRequisicao, false);
      }
      if ($data['Agrupamento'] != null && $editable == 'true') {
        echo formTemplate($idRequisicao, false, $data['Agrupamento'], $data['Textoconclusao']);
      }
      if ($data['Agrupamento'] != null && $editable == 'false') {
        echo formTemplate($idRequisicao, false, $data['Agrupamento'], $data['Textoconclusao']);
        // echo formTemplate($idRequisicao, false);
      }
      ?>


    </section>
  </main>

  <footer></footer>
  <script src="../form.js"></script>

</body>

</html>