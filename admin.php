<?php
include("conn_db.php");
include("functions.php");

if(!isset($_SESSION["username"]) || $_SESSION["rooli"] != "Yllapito"){
    header("location:login.php");
}


navbar();


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <h1>Ylläpidon kotisivu</h1> <?php echo $_SESSION["username"] ?> <br>
    <?php echo  "käyttäjän rooli: ". $_SESSION["rooli"] ?> <br>


</body>
</html>