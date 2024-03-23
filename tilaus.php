<?php
include("conn_db.php");
include("functions.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="jsTilaus.js">
        
    </script>
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
            <input id="tableinfo" name="tableinfo" class="form-control" type="text" onkeypress="return /[a-zA-Z0-9]/.test(event.key)" >
            <h2 class="card-title">Menu</h2>
            
                    <div class="container text-center" nimi="juomat">
                        <div class="row" id="js-menu">
                        </div>
                        
                        
                    </div>
        </div>
</form>
<!--  Juoma end   -->



    
            
                
                        <div class="container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Tuote</th>
                                        <th>  </th>
                                        <th>kpl</th>
                                        <th><button onclick="getReceipt()" id="receiptBtn" class="btn btn-success" type="button" >tilaa</button></th>
                                    </tr>
                                </thead>
                                <tbody class="js-text-area" id="js-text-area">

                                </tbody>

                            
                        </div>   
                        




<script>






  // Select the target node
const targetNode = document.getElementById('js-text-area');

// Options for the observer (which mutations to observe)
const config = { childList: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Loop through each mutation
    for(const mutation of mutationsList) {
        // Check if nodes were added
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Loop through added nodes
            mutation.addedNodes.forEach(node => {
                // Check if the added node is a table row
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'tr') {
                    // Check if a row with the same ID already exists
                    const existingRow = document.getElementById(node.id);
                    if (existingRow && existingRow !== node) {
                        // If it does, remove the existing row
                        existingRow.remove();
                    }
                }
            });
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
</script>




</body>
</html>