<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>
<?php
    
    include("conn_db.php");
    include("functions.php");
    
?>

    <!-- "Lisää tuote" Modal start -->
    <div class="modal fade" id="add-new-modal" tabindex="-1" aria-labelledby="add-new-modal" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="add-new-modal">Lisää tuote</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <form class="js-add-user-form" onsubmit="addProduct(event)">
                <div class="modal-body">

                    
                        <div class="mt-2">
                            <label for="tuotenimi" class="form-label">Tuote</label>
                            <input onkeypress="return /[a-zA-Z0-9]/.test(event.key)" type="text" class="form-control" id="tuotenimi" placeholder="tuote" required>
                        </div>
                        <div class="mt-2">
                        <label for="varastopaikka" class="form-label">Varastopaikka</label>
                            <select type="text" class="form-select form-select-md" id="varastopaikka" placeholder="varastopaikka">
                            <option value="Hylly">Hylly</option>
                            <option value="Jääkaappi">Jääkaappi</option>
                            <option value="Pöytä">Pöytä</option>
                            </select>

                            
                        </div>
                        <div class="mt-2">
                        <label for="kpl" class="form-label">KPL</label>
                            <input onkeypress="return /[0-9]/.test(event.key)" type="number" class="form-control" id="kpl" placeholder="kpl" required>
                        </div>

                    
                </div>
                
                <div class="modal-footer"> 
                <button type="submit" class="btn btn-primary">Tallenna</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sulje</button>
                </div>
                </form>
        </div>
        </div>
    </div>
    <!-- "Lisää tuote" Modal end -->









<!--                         TAULUKKO START  -->

<div class="table-responsive col-md-10 mx-auto">
<?php navbar(); ?> <br>
        <h2 class="my-2 text-center">Varastohallinta</h2>
        <h4 class="my-2">Tuotteet</h4>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th>Tuote</th>
                <th>Varastopaikka</th>
                <th>KPL</th>
                <th><button onclick="addModal.show()"  class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#add-new-modal">Lisää tuote</button></th>
            </tr>
            </thead>
            <tbody class="js-table-body">

            </tbody>
        </table>
    </div>
<!--                             TAULUKKO END  -->












</body>
</html>
<!-- BOOTSTRAP ITSE -->
<script
    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
<!-- BOOTSTRAP ITSE -->
<!-- JS LINKKAUS -->
<script src ="jsVarasto.js"></script>
<!-- JS LINKKAUS -->