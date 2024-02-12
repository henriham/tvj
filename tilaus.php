<?php
include("conn_db.php");
include("functions.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="jsTilaus.js"></script>
    <title>Document</title>
</head>
<body>
<div class="table-responsive col-md-10 mx-auto">
<?php navbar(); ?> <br>

<!--  Juoma start -->
<form class="">
    <div class="card text-center rounded" style="max-width: 800px;">
        <div class="card-body">
            <h2 class="card-title">Menu</h2> <br>
                    <div class="container text-center" nimi="juomat">
                        <div class="row" id="js-menu">
                        </div>
                        
                        
                    </div>
        </div>
</form>
<!--  Juoma end   -->



    <div class="card text-center rounded" style="max-width: 800px;">
            <div class="card-body mx-auto">
                <h3 class="card-title"></h3>
                        <div class="container text-center">
                            <div class="row" id="js-text-area">
                            
                            </div>
                            
                            
                        </div>







</div>
</body>
</html>