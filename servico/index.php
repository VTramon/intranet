<?php

// require '../connection.php';
// require './script.php';
error_reporting(E_ERROR | E_PARSE);


$idRequisicao = mb_split('id=', $_SERVER['REQUEST_URI'])[1] or header('location:/classificacao/index.php');
// $editable = mb_split('editable=', $_SERVER['REQUEST_URI'])[1];
$editable = false;

$fullUsername = shell_exec("wmic computersystem get username");
// $test = mb_split('\\\\', $fullUsername);
$username = mb_split(' ', mb_split('\\\\', $fullUsername)[1])[0];
$usernameRegex = preg_match('(vitor\\.lemos|fasmj|francisco\\.junior|luccas\\.moragas|rafael\\.moraes)', $username);


if ($usernameRegex) {
  $editable = true;
}



function formTemplate($id, $isDisabled = false, $editable = false)
{
  $result = new DOMDocument('1.0', 'UTF-8');

  $result->encoding = 'UTF-8';

  $internalErrors = libxml_use_internal_errors(true);
  $html = "<div class='input_container'>
      <label for='input'>Agrupamento</label>
      <input value='' autocomplete='off' role='combobox' list='' id='input' name='input' " . isDisabled($isDisabled) . " />

      <datalist id='datalist' role='listbox'>
        <option value='Software'>Software</option>
        <option value='Hardware'>Hardware</option>
        <option value='RM'>RM</option>
        <option value='Operacional'>Operacional</option>
      </datalist>
    </div>

    <div class='input_container'>
      <label for='texto'>Solução</label>
      <textarea type='text' name='texto' id='texto' " . isDisabled($isDisabled) . "></textarea>
    </div>

    <input id='hidden_id' type='hidden' name='id' value='$id'>
    <input id='hidden_editable' type='hidden' name='editable' value='$editable'>";

  if ($editable == true) {
    $result->loadHTML('<?xml encoding="utf-8" ?>' . $html . "<button id='edit_button'>Habilitar</button>");
  } else {
    $result->loadHTML('<?xml encoding="utf-8" ?>' . $html);
  }

  libxml_use_internal_errors($internalErrors);

  return $result->saveHTML();
}



function isDisabled($value)
{
  if ($value == false) {
    return 'disabled';
  } else {
    return '';
  }
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
      // if ($usernameRegex && ($data['Status'] == 'A revisar' || $data['Status'] == 'Revisado')) {
      $html = new DOMDocument();
      $html->loadHTML("<input id='conclude_hidden_id_input' type='hidden' name='id' value='$idRequisicao'>");
      echo $html->saveHTML();
      // }
      ?>
    </form>
  </header>

  <main>
    <section>

      <div id="image_container">
        <!-- <a id="prev" class="prev" onclick="plusSlides(1)">&#10094;</a>
        <a class="next" onclick="plusSlides(-1)">&#10095;</a> -->
      </div>

      <div class="service_details">
        <div id='usuario_container' class="data_container">
          <p class="usuario_label">Usuário:</p>
          <p id="usuario"></p>
        </div>

        <div id='setor_container' class="data_container">
          <p class="setor_label">Setor:</p>
          <p id="setor"></p>
        </div>

        <div id='created_container' class="data_container">
          <p class="data_label">Criado:</p>
          <p id="criado"></p>
        </div>

        <div class="data_container texto_container">
          <p class="texto_label">Texto:</p>
          <p id="texto_requisicao"></p>
        </div>

      </div>

      <form id='update_form' action='./submit.php' method='post'>
        <?php
        if ($data['Agrupamento'] && $editable == true) {
          echo formTemplate($idRequisicao, true);
        }
        if ($data['Agrupamento'] && $editable == false) {
          // Retorna nada
        }
        if (!$data['Agrupamento'] && $editable == true) {
          echo formTemplate($idRequisicao, false, $editable);
        }
        if (!$data['Agrupamento'] && $editable == false) {
          echo formTemplate($idRequisicao, false);
        }
        ?>
      </form>
    </section>
  </main>

  <footer></footer>

  <script type="module" src="./script.js"></script>

</body>

</html>