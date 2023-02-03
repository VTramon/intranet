<?php

require './connection.php';


// queryData("CREATE TABLE Trequisicao(
//     Idrequisicao INT NOT NULL IDENTITY(1,1), 
//     Usuario VARCHAR(60) NOT NULL,
//     Createdat DATETIME NOT NULL, 
//     Updatedat DATETIME NOT NULL, 
//     Completedat DATETIME NOT NULL, 
//     Setor VARCHAR(50) NOT NULL, 
//     Status VARCHAR(20) NOT NULL, 
//     Textorequisicao VARCHAR(MAX) NOT NULL, 
//     Textoconclusao VARCHAR(MAX) NOT NULL,
//     Imagem INT FOREIGN KEY REFERENCES Timagem(Idimagem),
//     Agrupamento INT FOREIGN KEY REFERENCES Tagrupamento(Idagrupamento),
//     )") or die(print_r(sqlsrv_errors(), true));

// queryData('CREATE TABLE Timagem(Idimagem INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
//     Dadoimagem VARCHAR(MAX) NOT NULL)');

// queryData('CREATE TABLE Tagrupamento(Idagrupamento INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
//     Tipoagrupamento VARCHAR(20) NOT NULL)');


// $query = queryData('select * from Timagem');
// $data = [];
// while ($row = sqlsrv_fetch_array($query)) {
//     array_push($data, $row);
// }

// echo json_encode($data);


// queryData('DROP TABLE Trequisicao');
// queryData('DROP TABLE Timagem');
// queryData('DROP TABLE Tagrupamento');

// queryData('ALTER TABLE IF EXISTS Trequisicao
//     ADD CONSTRAINT Tagrupamento FOREIGN KEY (Agrupamento)
//     REFERENCES public.classificacao (id) MATCH SIMPLE
//     ON UPDATE NO ACTION
//     ON DELETE CASCADE
//     NOT VALID;');
// $addConstraints = 'ALTER TABLE IF EXISTS public.requisicao
// ADD CONSTRAINT classificacao FOREIGN KEY (classificacao)
// REFERENCES public.classificacao (id) MATCH SIMPLE
// ON UPDATE NO ACTION
// ON DELETE CASCADE
// NOT VALID;';



// queryData("DROP TABLE Timagem") or die(print_r(sqlsrv_errors(), true));
// queryData("INSERT INTO Timagem(Dadoimagem) VALUES()") or die(print_r(sqlsrv_errors(), true));
// queryData("delete from Timagem");

// $query = sqlsrv_query($GLOBALS['connect'], 'select * from Timagem') or die(print_r(sqlsrv_errors(), true));
// $data = [];
// echo $query;
// while ($row = sqlsrv_fetch_array($query, 1)) {

// $imagem = new DOMDocument();
// $imagem->loadHTML('<?xml encoding="utf-8" ?\>' . "<img src='$row[1]' alt='imagem'>");


    // echo $imagem->saveHTML();
    // array_push($data, $row[0]);
// }
// echo json_encode($data);
// echo 'aldjhblaj';
