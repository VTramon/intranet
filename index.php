<?php

// $fullUsername = shell_exec("wmic computersystem get username");
// $fullName = shell_exec("wmic computersystem get name");

// $nameRegex = preg_match('(BYIMP-|TEC-)', $fullName);
// $usernameRegex = preg_match('(TECAL)', $fullUsername);


// if (!$nameRegex && !$usernameRegex) {
//   echo $fullName;
//   header("Location: /unauthorized/index.html");
//   die();
// }

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./style.css" />
  <link rel="stylesheet" href="./form.css" />

  <script src="https://kit.fontawesome.com/78da1e076c.js" crossorigin="anonymous"></script>

  <title>Solicitação de Serviço</title>
</head>

<body>
  <div class="body_row_content">
    <nav class="side_bar">
      <div class="logo_container">
        <img src="./public/images/tecal.png" alt="Logo Tecal" />
      </div>

      <div class="issue_button_container">
        <i class="fa-solid fa-headset"></i>

        <a class="issue_button">Críticas & Sugestões</a>
      </div>

      <nav class="buttons_nav">
        <div class="button_container">
          <div>
            <i aria-hidden="true" class="fas fa-home"></i>

            <a href="http://intranet/">Home</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="fas fa-building"></i>
            <a href="http://intranet/sobre-a-tecal/">Sobre a Tecal</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="fas fa-globe"></i>

            <a href="http://intranet/politicas-2/">Políticas</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="fas fa-book-reader"></i>

            <a href="http://intranet/procedimentos_01/">Procedimentos</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="fas fa-clipboard-check"></i>

            <a href="http://intranet/manuais/">Manuais</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="fas fa-clipboard-list"></i>

            <a href="http://intranet/formularios/">Formulários</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="far fa-address-book"></i>

            <a href="http://intranet/contatos/">Contatos</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="fas fa-birthday-cake"></i>

            <a href="http://intranet/aniversarios/">Aniversários</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="fas fa-exclamation-circle"></i>

            <a href="http://intranet/leis-normas/">Leis & Normas</a>
          </div>
        </div>

        <div class="button_container">
          <div>
            <i class="fas fa-hands-helping"></i>

            <a href="http://intranet/convenios/">Convênios & Parcerias</a>
          </div>
        </div>

        <div class="button_container current_page_button_container">
          <div>
            <i class="fab fa-servicestack"></i>

            <a disabled href="_blank">Solicitação de Serviço</a>
          </div>
        </div>
      </nav>
    </nav>

    <main>
      <div class="banner">
        <h1>SOLICITAÇÃO DE SERVIÇO</h1>
      </div>

      <div class="form_header">
        <h3>Formulário de Soliciatação</h3>
      </div>

      <form id="form" method="post" enctype="multipart/form-data" action="./submit.php">
        <div class="input_container setor_container">

          <label for="setor">Setor de Destino</label>
          <input autocomplete='off' role='combobox' list='' id='input' name='input'  />

          <datalist id='datalist' role='listbox'>
            <option value="Administração">Administração</option>
            <option value="Facilities">Facilities</option>
            <option value="TI">TI</option>
            <option value="RH">RH</option>
            <option value="Financeiro">Financeiro</option>
            <option value="DP">DP</option>
            <option value="Comercial">Comercial</option>
            <option value="Projetos">Projetos</option>
            <option value="Suprimentos">Suprimentos</option>
            <option value="Engenharia">Engenharia</option>
            <option value="SESMET">SESMET</option>
          </datalist>
        </div>

        <div class="input_container">
          <label for="texto">Conte-nos o que está acontecendo</label>
          <textarea type="text" name="texto" id="texto"></textarea>
        </div>

        <div class="input_container">
          <label for="arquivo">Imagem</label>
          <input type="file" name="arquivo" id="arquivo" />
        </div>

        <button id="submit_button">Enviar</button>
      </form>
    </main>
  </div>

  <footer>
    <div>
      <p>TELEFONE: +55 (21) 3293-2900​</p>
    </div>

    <div>
      <p>E-MAIL: tecal@tecal.com.br​</p>

    </div>

    <div>
      <p>
        ENDEREÇO: Rua da Estrela, 77, 3º Andar, Rio Comprido - Rio de Janeiro
        / RJ | CEP: 20251-021​
      </p>
    </div>
  </footer>
  <script src="./script.js"></script>
  <script src="./form.js"></script>
</body>

</html>