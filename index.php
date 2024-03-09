<?php

##$host="localhost:3306";  #tietokannan osoite
##$user="admin";      #tietokannan kt
##$password="admin";  #tietokannan ss
##$db="admin";        #tietokannan nimi



##session_start();#aloitetaan sessio jotta globaali _SESSION muuttuja on käytössä.

include("conn_db.php");



##$data=mysqli_connect($host, $user, $password, $db);
#data muuttuja se joka yhdistää kikkareen tietokantaan
if($conn===false){
    die("yhteysvirhe!");
} # tämä of lauseke katsoo, jos data-muuttujaa ei ole, niin on yhteysvirhe

if($_SERVER["REQUEST_METHOD"]=="POST"){
    # jos postataan username ja passu toteutuu alla oleva koodi
    
    $username=$_POST["username"];
    $password=$_POST["password"];
    $rooli="";
    #sql kysely, joka hakee usernamen ja passun sql taulukosta postattujen perusteella
    $sql="SELECT * FROM login WHERE username='".$username."' AND password='".   $password."'";
    
    $result=mysqli_query($conn, $sql); # result avaa yhteyden tietokantaan ja hakee sieltä kyselyn joka on tallennettu sql muuttujaan

    $row=mysqli_fetch_array($result); # palauttaa haetun sql rivin stringi tyyppisenä

    #sql kysely jotta saadaan rooli ulos ja tallennettua globaaliin muuttujaan
    if($row["rooli"]=="Varasto"){
        $_SESSION["username"]=$username; # username muuttuja tallennetaan sessionin taulukon username alle
        $_SESSION["rooli"]="Varasto";
        header("location:varasto.php");#routtaus omalle sivulle
    }

    elseif($row["rooli"]=="Tarjoilija"){
        $_SESSION["username"]=$username;
        $_SESSION["rooli"]="Tarjoilija";
        header("location:tilaus.php");
    }

    elseif($row["rooli"]=="Yllapitaja"){
        $_SESSION["username"]=$username;
        $_SESSION["rooli"]="Yllapitaja";
        header("location:varasto.php");
    }

    else{
        echo '<script>
                
        alert("Väärä käyttäjätunnus tai salasana!")
        window.location.href = "index.php";
    </script>';
    }


}






?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>TVJ</title>
</head>
<body>
    
    


    <div style="" class="rounded container container-small w-50 p-5 mt-5 border border-dark">
    <h1>TVJ</h1> <br>
    <form action="#" method="post" autocomplete="off">
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Käyttäjätunnus</label>
        <input type="text" name="username" required class="form-control" id="username" aria-describedby="username">
        
    </div>
    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Salasana</label>
        <input ttype="password" name="password" required class="form-control" id="exampleInputPassword1">
    </div>
    <input type="submit" value="Kirjaudu sisään" class="btn btn-primary">
    
    </form>




    </div>
    
    
    
</body>
</html>