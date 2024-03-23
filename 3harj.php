<?php
include('1harj.php')
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Document</title>
</head>
<body  style="background-color: lightgrey;">

    <div class="">
        <div class="m-4 d-flex " >
                <div div class="m-4">
                    <table>
                        
                        <tbody id="table"></tbody>
                    </table></div>
                <div div class="m-4">
                    <div style="width:100px;" id="buttonArea">

                    </div>
                </div>
                <div div class="m-4">
                    <input class="form-control" type="text" id="btnText" placeholder="Default input" aria-label="default input example">
                    <button onclick="createBtn()" type="button" id="createBtn" class="btn btn-success">luo nappi</button>
                    <button onclick="delBtn()" type="button" id="deleteBtn" class="btn btn-danger">poista nappi</button>
                </div>
        </div>
    </div>


<script src="2harj.js"></script>
</body>
</html>