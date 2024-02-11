<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <title>Käyttäjähallinta</title>
</head>
<body>
<?php
    
    include("conn_db.php");
    include("functions.php");

    if(!isset($_SESSION["username"]) || $_SESSION["rooli"] != "Yllapitaja"){
        header("location:index.php");
    }
    
?>
    
<!-- Button trigger modal -->

<!--
    video: https://www.youtube.com/watch?v=1jTT0Yb8_zE
    aika: 1:45:24
-->
    <!-- "add new user" Modal start -->
    <div class="modal fade" id="add-new-modal" tabindex="-1" aria-labelledby="add-new-modal" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="add-new-modal">Lisää uusi käyttäjä</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <form class="js-add-user-form" onsubmit="add_new(event)">
                <div class="modal-body">

                    
                        <div class="mt-2">
                            <label for="username" class="form-label">Käyttäjätunnus</label>
                            <input onkeypress="return /[a-zA-Z0-9]/.test(event.key)" type="text" class="form-control" id="username" placeholder="username" required>
                        </div>
                        <div class="mt-2">
                            <label for="password" class="form-label">Salasana</label>
                            <input onkeypress="return /[a-zA-Z0-9]/.test(event.key)" type="text" class="form-control" id="password" placeholder="password" required>
                        </div>
                        <div class="mt-2">
                            <label for="role" class="form-label">Rooli</label>
                            <select type="text" class="form-select form-select-md" id="role" placeholder="role" required>
                            <option value="Yllapitaja">Yllapitaja</option>
                            <option value="Varasto">Varasto</option>
                            <option value="Tarjoilija">Tarjoilija</option>
                            </select>
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
    <!-- "add new user" Modal end -->

    <!-- "edit user" Modal start -->
    <div class="modal fade" id="edit-new-modal" tabindex="-1" aria-labelledby="edit-new-modal" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="edit-new-modal">Muokkaa</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <form class="js-edit-user-form" onsubmit="edit_row(event)">
                <div class="modal-body">

                    
                        <div class="mt-2">
                            <label for="username" class="form-label">Käyttäjätunnus</label>
                            <input type="text" class="form-control" id="username" placeholder="username" required>
                        </div>
                        <div class="mt-2">
                            <label for="password" class="form-label">Salasana</label>
                            <input type="text" class="form-control" id="password" placeholder="password" required>
                        </div>
                        <div class="mt-2">
                            <label for="role" class="form-label">Rooli</label>
                            <select type="text" class="form-select form-select-md" id="role" placeholder="role" required>
                            <option value="Yllapitaja">Yllapitaja</option>
                            <option value="Varasto">Varasto</option>
                            <option value="Tarjoilija">Tarjoilija</option>
                            </select>
                        </div>
                        <input type="hidden" id="id">
                    
                </div>
                
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sulje</button>
                <button type="submit" class="btn btn-primary">Tallenna</button>
                </div>
                </form>
        </div>
        </div>
    </div>
        <!-- "edit user" Modal end -->


    <div class="table-responsive col-md-10 mx-auto">
    <?php navbar(); ?> <br>
        <h2 class="my-2 text-center">Käyttäjähallinta</h2>
        <h4 class="my-2">Käyttäjät</h4>
        <table class="table table-striped table-hover">
            <thead>  
            <tr>
                <th>Käyttäjätunnus</th>
                <th>salasana</th><th>rooli</th>
                <th><button onclick="addModal.show()"  class="btn btn-success btn-sm">Lisää käyttäjä </button></th>
            </tr>
            </thead>      
            <tbody class="js-table-body">

            </tbody>
        </table>
    </div>











</body>
</html>
<!-- BOOTSTRAP ITSE -->
<script
    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
<!-- BOOTSTRAP ITSE -->
<!-- JS LINKKAUS -->
<script src ="jsKayttajat.js"></script>
<!-- JS LINKKAUS -->

