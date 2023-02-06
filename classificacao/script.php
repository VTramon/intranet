<?php
require '../connection.php';
// $test = array(
//   "id" => "abukybakub",
//   "createdAt" => '2023-01-26 12:35:05',
//   "updatedAt" => null,
//   "completedAt" => null,
//   "status" => 'à revisar',
//   "username" => "vitor.lemos",
//   "setor" => "TI",
//   "text" => "\sblfblJFBLAJBHLAJVFBLVBALfbjhsf",
//   "classificacao" => null,
//   "imagem" => null,
// );

// $dataList = [$test, $test, $test, $test, $test, $test, $test];



function printData()
{
  $data = getAllRequisicao();

  // echo json_encode($data[0]['Createdat']);

  // $time = new DateTime();

  // echo $data[0]['Createdat']->format('Y-m-d H:i:s');

  $fullUsername = shell_exec("wmic computersystem get username");
  $username = mb_split(' ', mb_split('\\\\', $fullUsername)[1])[0];
  $usernameRegex = preg_match('(vitor\\.lemos|fasmj|francisco\\.junior|luccas\\.moragas|rafael\\.moraes)', $username);


  if ($usernameRegex) {
    for ($i = 0; $i < count($data); $i++) {
      echo template($data[$i], 'true');
    }
  } else {
    for ($i = 0; $i < count($data); $i++) {
      echo template($data[$i], 'false');
    }
  }
}


function handleStatusClass($status)
{
  if ($status == 'A revisar') {
    return 'a_revisar';
  }
  return lcfirst($status);
}

function handleStatusSpan($status)
{
  if ($status == 'A revisar') {
    return 'À revisar';
  }
  return $status;
}


function handleTime($then)
{
date_timezone_set($then, timezone_open('America/Sao_Paulo'));
date_default_timezone_set('America/Sao_Paulo');

  
  $now = new DateTime();
  $now->format('d-m-Y H:i:s');

  $diff = $then->diff($now);

  // return $diff->format('d-m-Y H:i:s');
  // return var_dump($then->format('d-m-Y H:i:s'));
  // return var_dump($then);

  if ($diff->format('%m') >= 1) {
    return $diff->format('%m') . " mês";
  }

  if ($diff->format('%d') == 1) {
    return $diff->format('%d') . " dia";
  }

  if ($diff->format('%d') > 1) {
    return $diff->format('%d') . " dias";
  }

  if ($diff->format('%h') >= 1) {
    return $diff->format('%h') . "h";
  }

  if ($diff->format('%i') >= 1) {
    return $diff->format('%i') . "m";
  }

  return $diff->format('%s') . "s";
}


function template($data)
{
  $result = new DOMDocument('1.0', 'UTF-8');

  $result->encoding = 'UTF-8';

  $internalErrors = libxml_use_internal_errors(true);

  // $statusText = handleStatusText($data['classificacao'], $data['completed_at']);
  $time = handleTime($data['Createdat']);
  $statusClass = handleStatusClass($data['Status']);
  $statusSpan = handleStatusSpan($data['Status']);
  $setor = '  ' . $data['Setor'];

  $html = "<a href='/servico/index.php?id={$data['Idrequisicao']}'>
      <li id='card-{$data['Idrequisicao']}' class='card'> 
        <p class='usuario'>{$data['Usuario']}</p>
        <div class='setor_container'>
          <p id='setor'>Para: $setor</p>
        </div>
        <p class='texto'>{$data['Textorequisicao']}</p>
        <div class='status_container'>
          <div class='$statusClass'>
            <p class='isComplete'>$statusSpan</p>
          </div>
        </div>
        <p class='created_at'>$time atrás</p>
      </li>
    </a>";

  $result->loadHTML('<?xml encoding="utf-8" ?>' . $html);

  libxml_use_internal_errors($internalErrors);

  return $result->saveHTML();
}
