<?php
error_reporting(E_ERROR | E_PARSE);
$idRequisicao = explode('id=', $_SERVER['REQUEST_URI'])[1] or header('location:/classificacao/index.php');
$username = explode('\\', $_SERVER['LOGON_USER'])[1];
// echo $username;
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
    <form id='conclude_form' action="/server/index.php/servico/conclude" method="post">
      <input id="username_hidden_input" type="hidden" name="user" value="<?php echo $username ?>">
      <input id='conclude_hidden_id_input' type='hidden' name='id' value='<?php echo $idRequisicao ?>'>
    </form>
  </header>

  <main>
    <section>

      <div id="image_container">
        <!-- <a id="prev" class="prev" onclick="plusSlides(1)">&#10094;</a>
        <a class="next" onclick="plusSlides(-1)">&#10095;</a> -->
      </div>

      <div id="service_details"></div>

      <form id='update_form' action='/server/index.php/servico/update' method='post'>

        <input id='conclude_hidden_id_input' type='hidden' name='id' value='<?php echo $idRequisicao ?>'>
      </form>
    </section>
  </main>

  <footer></footer>

  <script type="module" src="./script.js">
  </script>

</body>

</html>