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
<div class="table-responsive col-md-10 mx-auto " style="max-width: 800px;">
<br>

<!--  Juoma start -->
<form class="">
<?php navbar(); ?>
    <div class="card text-center rounded" style="max-width: 800px;">
    
        <div class="card-body">
            <label class="form-label" for="tableinfo">Asiakasinfo: </label>
            <input id="tableinfo" name="tableinfo" class="form-control" type="text">
            <h2 class="card-title">Menu</h2>
            
                    <div class="container text-center" nimi="juomat">
                        <div class="row" id="js-menu">
                        </div>
                        
                        
                    </div>
        </div>
</form>
<!--  Juoma end   -->



    
            
                
                        <div class="container">
                            <table class="row">
                            
                            <tbody class="js-text-area" id="js-text-area">

                            </tbody>
                           
                            
                        </div>   
                        








</body>
</html>