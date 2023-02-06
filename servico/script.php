<?php

function formTemplate($id, $isDisabled = false, $agrupamento = '', $texto = '', $editable = false)
{
  $result = new DOMDocument('1.0', 'UTF-8');

  $result->encoding = 'UTF-8';

  $internalErrors = libxml_use_internal_errors(true);
  $html = "<div class='input_container'>
      <label for='input'>Agrupamento</label>
      <input value='$agrupamento' autocomplete='off' role='combobox' list='' id='input' name='input' " . isDisabled($isDisabled) . " />

      <datalist id='datalist' role='listbox'>
        <option value='Software'>Software</option>
        <option value='Hardware'>Hardware</option>
        <option value='RM'>RM</option>
        <option value='Operacional'>Operacional</option>
      </datalist>
    </div>

    <div class='input_container'>
      <label for='texto'>Solução</label>
      <textarea type='text' name='texto' id='texto' " . isDisabled($isDisabled) . ">$texto</textarea>
    </div>

    <input type='hidden' name='id' value='$id'>

    <button id='enviar' type='submit'" . isDisabled($isDisabled) . ">Enviar</button>";
    // . $isDisabled == true && $texto != '' ? "<button id='edit_button'>Habilitar</button>" : ""


    if($editable == true && $texto != ''){
      $result->loadHTML('<?xml encoding="utf-8" ?>' . $html . "<button id='edit_button'>Habilitar</button>");
    }else{
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


function imgTemplate($image)
{
  $result = new DOMDocument('1.0', 'UTF-8');

  $result->encoding = 'UTF-8';

  $internalErrors = libxml_use_internal_errors(true);
  $html = "<img src='$image' alt='imagem da requisição'>";
  // $html = "<img src='data:image/png;base64,$image' alt='imagem da requisição'>";

  // $result->loadHTML($html);
  $result->loadHTML('<?xml encoding="utf-8" ?>' . $html);

  libxml_use_internal_errors($internalErrors);

  return $result->saveHTML();
}
