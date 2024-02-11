<?php
include("conn_db.php");
include("functions.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div class="table-responsive col-md-10 mx-auto">
<?php navbar(); ?> <br>

<!--  Juomat   -->

<div class="card text-center rounded" style="max-width: 600px;">
    <div class="card-body">
        <h2 class="card-title">Juomat</h2> <br>
                <div class="container text-center">
                <div class="row">
                    <div class="col-sm">
                    <button type="button " class="btn btn-primary btn-lg">Kahvi</button>

                    </div>
                    <div class="col-sm">
                    <button type="button" class="btn btn-primary btn-lg">Tee</button>

                    </div>
                    <div class="col-sm">
                    <button type="button" class="btn btn-primary btn-lg">Vesi</button>

                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm">
                    <button type="button" class="btn btn-primary btn-lg">Olut</button>

                    </div>
                    <div class="col-sm">
                    <button type="button" class="btn btn-primary btn-lg">Siideri</button>

                    </div>
                    <div class="col-sm"><button type="button" class="btn btn-primary btn-lg">Cola</button>
</div>
            </div>
</div>
        
        
    </div>
</div>
<!--  Juomat end   -->












</div>
</body>
</html>