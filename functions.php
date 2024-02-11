<?php



#testataan toimiiko sessioni kansiossa
function testfunc(){
    if(isset($_SESSION["rooli"]))
    echo "rooli on olemassa";
}

#navigointibar valikoituu käyttäjän roolin mukaan
function navbar(){
    if($_SESSION["rooli"]== "Yllapitaja"){
        include("navbaradmin.php");
    }
    else{
        include("navbaruser.php");
    }
        
}


#------------------------------SQL FUNKTIOT-----------------------------------#


#____________________________SQL VARASTONHALLUNTA______________________________#


##   FUNKTIO JOKA TEKEE QUERYN TIETOKANTAAN, JOTTA HTML LISTA TULOSTUU!!!!!!###
function displayVarastoData(){
    global $conn;
    $query = "SELECT * FROM tuotteet";
    $result = mysqli_query($conn, $query);
    return $result;
}

## Funtio jonka muuttujat tulevat modaali formista, näin voi lisätä tuotteita tietokantaan
function addProduct($tuotevalue, $kplvalue, $varastopaikkavalue){
    global $conn;
        $query = "INSERT INTO tuotteet (tuotenimi, kpl, varastopaikka) VALUES('$tuotevalue', '$kplvalue', '$varastopaikkavalue')";
        $result= mysqli_query($conn, $query);
        close($conn);
        return $result;
}

#!!      $num muuttuja tulee insertData.php for loopista joka antaa nimet luoduille napeille, SQL lausekkeeseen taas käytetään loopin $i SQL hussa.

######## -1 tietokannan tuote kpl:stä funktio ######
function minusOne($num){
    global $conn;
    $query = "UPDATE tuotteet SET kpl = kpl - 1 WHERE tuoteid = $num";
    $result = mysqli_query($conn, $query);
    
    return $result;
}

### +1 kpl tietokannan tuote kappalemäärään funktio
function plusOne($num){
    global $conn;
    $query = "UPDATE tuotteet SET kpl = kpl + 1 WHERE tuoteid = $num";
    $result = mysqli_query($conn, $query);
    return $result;   
}

## RIVIN POISTO TAULUSTA FUNKTIO ##!!
function delRow($num){
    global $conn;
    $query = "DELETE FROM tuotteet WHERE tuoteid = $num ";
    $result = mysqli_query($conn, $query);
    return $result;
}
#____________________________SQL VARASTONHALLUNTA______________________________#

function displayUserData(){
    global $conn;
    $query = "SELECT username, rooli FROM login";
    $result = mysqli_query($conn, $query);
    return $result;
}
#____________________________SQL KÄYTTÄJÄHALLINTA______________________________#




#____________________________SQL KÄYTTÄJÄHALLINTA______________________________#

#------------------------------SQL FUNKTIOT------------------------------------#


?>